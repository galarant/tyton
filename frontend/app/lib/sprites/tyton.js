import { Phrase } from 'lib/interface/phrase';
import { Dialog } from 'lib/interface/dialog';

class Tyton extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          game.camera.x + game.camera.width / 2,
          game.ground.y - 155,
          "tyton");
    this.width = 120;
    this.height = 120;

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 1.5);
    // this.body.static = true;

    //game world attributes
    game.world.add(this);
    game.camera.follow(this);

    //object attributes
    this.dialog = null;
  }

  update() {
    //handle inputs
    if (this.game.cursors.left.isDown)
    {
      this.body.applyForce(-400,0);
    }

    if (this.game.cursors.right.isDown)
    {
      this.body.applyForce(400,0);
    }

    if (this.game.cursors.up.isDown)
    {
      this.body.applyForce(0, -375);
    }

    if (this.game &&
        this.game.input.activePointer &&
        this.game.input.activePointer.justReleased()) {
      this.speak();
    }

  }

  start_speaking(strings) {
    this.body.static = true;
    this.speaking_tween = this.game.add.tween(this).to({alpha: 0.4}, 1000, "Linear", true, 0, -1, true);
    this.dialog = new Dialog(this.game, strings, 150, 100);
    this.speak();
  }

  speak() {
    if (this.dialog !== null) {
      let next_phrase = this.dialog.next();
      if (next_phrase === null) {
        this.stop_speaking();
      }
    }
  }

  stop_speaking() {
    this.dialog = null;
    this.speaking_tween.stop();
    this.game.add.tween(this).to( {alpha: 1}, 125, "Linear", true);
    this.body.static = false;
  }

  say(strings) {
    this.start_speaking(strings);
  }

}

export { Tyton };
