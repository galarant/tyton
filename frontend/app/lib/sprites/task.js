//generic imports
import moment from "moment/moment";

//interface display imports
import { Modal } from "lib/interface/display/modal";
import { Dialog } from "lib/interface/display/dialog";
import { Countdown } from "lib/interface/display/countdown";

//interface input imports
import { Keyboard } from "lib/interface/input/keyboard";

class Task extends Phaser.Group {

  constructor(game, font_size=null, duration=70, difficulty=null, name=null,
              created_at=null, started_at=null, finished_at=null, succeeded=null) {

    super(game, game.world);
    this.fixedToCamera = true;
    this.duration = duration;
    this.submit_signal = new Phaser.Signal();

    if (font_size) {
      this.font_size = font_size;
    } else if (game.font_size) {
      this.font_size = game.font_size;
    }

    //new Task so we need to raise the modals
    if (name === null) {
      let modal = new Modal(game, new Keyboard(game));
      modal.submit_signal.addOnce(this.name_submit_handler, this);
    }
  }

  name_submit_handler(modal_return_value) {
    this.name = modal_return_value;
    this.set_sprites();
  }

  set_sprites() {
    let name_sprite = new Phaser.BitmapText(this.game,
      0, 0, "proxima_nova", this.name, this.font_size);
    this.addChild(name_sprite);

    this.countdown = new Countdown(this.game,
      name_sprite.width + this.font_size / 2, 0, this.font_size, this.duration);
    this.addChild(this.countdown);
    this.cameraOffset = new Phaser.Point(20, 20);
    this.alpha = 0;
    this.game.add.tween(this).to({alpha: 1.0},
      Phaser.Timer.SECOND * 1.0, "Linear", true);
    this.countdown.submit_signal.addOnce(this.expire, this);
  }

  expire() {
    this.submit_signal.dispatch();
  }

  update() {
    if (this.countdown) {
      this.countdown.update();
    }
  }

}

export { Task };
