import moment from "moment/moment";
import "moment-duration-format/lib/moment-duration-format";

class Countdown extends Phaser.BitmapText {

  constructor(state, x, y, font_size, duration) {

    super(state.game,
          x,
          y,
          "proxima_nova",
          '',
          font_size);

    //object attributes
    this.expires_at = moment().add(duration, 'seconds');
  }

  update() {

    let time_left = moment.duration(this.expires_at.diff(moment()));
    let seconds_left = time_left.as('seconds');

    if (seconds_left >= 3600) {
      this.tint = 0xFFFFFF;
    }
    else if (seconds_left >= 60) {
      this.tint = 0xFFFFFF;
    }
    else if (seconds_left > 0) {
      this.tint = 0xFF0000;
    }
    else {
      this.expire();
    }

    this.text = time_left.format();

  }

  expire() {
    if (this.parent.expire) {
      this.parent.expire();
    } else {
      console.log('countdown expired!');
      this.destroy();
    }
  }

}

export { Countdown };
