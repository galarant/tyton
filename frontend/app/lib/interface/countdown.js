import moment from 'moment/moment';
import 'moment-duration-format/lib/moment-duration-format';

class Countdown extends Phaser.BitmapText {

  constructor(game, duration=70, font_size=80) {

    super(game,
          game.camera.width,
          10,
          "glametrix",
          '',
          font_size);

    //sprite attributes
    this.fixedtoCamera = true;

    //world attributes
    game.world.add(this);

    //object attributes
    this.expires_at = moment().add(duration, 'seconds');
    this.update();
  }

  update() {

    let time_left = moment.duration(this.expires_at.diff(moment()));
    let seconds_left = time_left.as('seconds');

    if (seconds_left >= 3600) {
      this.tint = 0xFFFFFF;
      this.x = this.game.camera.width - 160;
    }
    else if (seconds_left >= 60) {
      this.tint = 0xFFFFFF;
      this.x = this.game.camera.width - 130;
    }
    else if (seconds_left > 0) {
      this.tint = 0xFF0000;
      this.x = this.game.camera.width - 90;
    }
    else {
      this.expire();
    }

    this.text = time_left.format();

  }

  expire() {
    console.log('countdown expired!');
    this.destroy();
  }

}

export { Countdown };
