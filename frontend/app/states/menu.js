import _ from 'lodash';
import { TytonPhrase } from 'lib/dialog/tyton_phrase';

class MenuState extends Phaser.State {

  preload() {}

  create() {
    let game = this.game;
    this.background = this.game.add.sprite(this.game.world.centerX,
                                           this.game.world.centerY,
                                           "background");
    this.background.anchor.setTo(0.5);
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.gradient_mask = this.game.add.sprite(this.game.world.centerX,
                                              this.game.world.centerY,
                                              "color_gradient");
    this.gradient_mask.anchor.setTo(0.75);
    this.gradient_mask.width = this.game.width * 4;
    this.gradient_mask.height = this.game.height * 4;
    this.gradient_mask.alpha = 0.5;

    this.add.tween(this.gradient_mask.anchor).to(
      {y: 0.25}, 10000, "Quad.easeOut", true, 0, -1, true);

    this.add.tween(this.gradient_mask.anchor).to(
      {x: 0.25}, 15000, "Quad.easeOut", true, 0, -1, true);

    this.add.tween(this.gradient_mask).to(
      {angle: 360}, 20000, "Linear", true, 0, -1, false);

    //add the title
    let phrase = new TytonPhrase(this.game, "TYTON", 150, 300);
    phrase.show();

    this.input.onDown.add(this.menuClick, this);
  }

  update() {}

  resize() {
    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;

    this.gradient_mask.width = this.game.width * 4;
    this.gradient_mask.height = this.game.height * 4;

    this.title.x = this.game.world.centerX;
    this.title.y = this.game.world.centerY;
  }

  menuClick() {
    this.glow = this.game.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "transition");
    this.glow.anchor.setTo(0.5);
    this.glow.width = this.game.width;
    this.glow.height = this.game.height;

    this.glow.alpha = 0;

    let transition_tween = this.game.add.tween(this.glow).to(
      {alpha: 0.8}, 1200, "Quart.easeIn");
    transition_tween.onComplete.add(this.moveToPlay, this);
    transition_tween.start();
  }

  moveToPlay() {
    this.game.state.start("play");
  }

}

export { MenuState };
