import _ from 'lodash';

class Phrase extends Phaser.BitmapText {

  constructor(game, phrase, font_size=150, frames=200) {

    super(game,
          0, 0,
          "glametrix",
          phrase,
          font_size);

    //sprite attributes
    this.anchor.setTo(0.5);
    this.center_on_camera();
    let letter_delay = 0;
    _(this.children).forEach(function(letter) {
        letter.alpha = 0;
        letter.show_tween = game.add.tween(letter).to(
          {alpha: 1}, frames * 8, "Quad.easeInOut", false, letter_delay);
        letter_delay += frames;
      }
    ).value();

    //world attributes
    game.world.add(this);

    //object attributes
    this.frames = frames;

  }

  show() {
    _(this.children).forEach(function(letter) {
        letter.show_tween.start();
      }
    ).value();
  }

  center_on_camera() {
    this.x = this.game.camera.x + this.game.camera.width / 2;
    this.y = this.game.camera.y + this.game.camera.height / 2;
  }
}

export { Phrase };
