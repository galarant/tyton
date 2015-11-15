import _ from 'lodash';

class Phrase extends Phaser.BitmapText {

  constructor(game, phrase, font_size=150, frames=200) {

    super(game,
          game.world.centerX,
          game.world.centerY,
          "glametrix",
          phrase,
          font_size);

    //sprite attributes
    this.anchor.setTo(0.5);
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

}

export { Phrase };
