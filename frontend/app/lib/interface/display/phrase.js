import _ from "lodash";

class Phrase extends Phaser.BitmapText {

  constructor(game, text, font_size=60,
    fade_in_speed=Phaser.Timer.SECOND * 2.0, dialog=null) {

    super(game, 0, 0, "proxima_nova", text, font_size, "center");

    //sprite attributes
    this.anchor.setTo(0.5);
    this.fade_in_speed = fade_in_speed;
    this.dialog = dialog;

    _.forEach(this.children, this.add_show_tween, this);
  }

  add_show_tween(letter, index, letters) {
    letter.alpha = 0;
    let letter_show_delay = (this.fade_in_speed / letters.length) * 0.33;
    let letter_show_speed = (this.fade_in_speed / letters.length) * 3.0;
    letter.show_tween = this.game.add.tween(letter).to(
      {alpha: 1}, letter_show_speed, "Quad.easeInOut", false, letter_show_delay * index);
    if (this.dialog) {
      let this_tween = this.dialog.tweens.add(letter.show_tween);
    }
  }

  show() {
    _.forEach(this.children, function(letter) {
        letter.show_tween.start();
      }
    );
  }

}

export { Phrase };
