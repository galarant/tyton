import moment from "moment/moment";
import "moment-duration-format/lib/moment-duration-format";

class Countdown extends Phaser.BitmapText {

  constructor(state, x, y, font_size, duration) {

    super(state.game, x, y, "proxima_nova", '', font_size);

    //object attributes
    this.expires_at = moment().add(duration, 'seconds');
    this.expiry_signal = new Phaser.Signal();
  }

  update() {

    let time_left = moment.duration(this.expires_at.diff(moment()));
    let seconds_left = time_left.as('seconds');

    if (seconds_left >= 3600) {
      //there are hours left
      this.tint = 0xFFFFFF;
    }
    else if (seconds_left >= 60) {
      //there are minutes left
      this.tint = 0xFFFFFF;
    }
    else if (seconds_left > 0) {
      //there are seconds left
      this.tint = 0xFF0000;
    }
    else {
      this.expire();
    }

    this.text = time_left.format();

  }

  expire() {
    this.expiry_signal.dispatch();
  }

}

export { Countdown };
