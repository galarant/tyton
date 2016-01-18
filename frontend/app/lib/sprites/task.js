import moment from "moment/moment";

import { Modal } from "../interface/modal";
import { Keyboard } from "../interface/keyboard/keyboard";
import { Countdown } from "../interface/countdown";
import { Dialog } from "../interface/dialog";

class Task extends Phaser.Group {

  constructor(state, font_size=null, duration=70, difficulty=null, name=null,
              created_at=null, started_at=null, finished_at=null, succeeded=null) {

    super(state.game, state.world);
    this.state = state;
    this.fixedToCamera = true;
    this.duration = duration;
    this.expiry_signal = new Phaser.Signal();

    if (font_size) {
      this.font_size = font_size;
    } else if (state.game.font_size) {
      this.font_size = state.game.font_size;
    }

    //new Task so we need to raise the modals
    if (name === null) {
      state.game.modal = new Modal(state, new Keyboard(state));
      state.game.modal.submit_signal.addOnce(this.name_submit_handler, this);
    }
  }

  name_submit_handler(modal_return_value) {
    this.name = modal_return_value;
    this.set_sprites();
  }

  set_sprites() {
    let name_sprite = new Phaser.BitmapText(this.state.game,
      0, 0, "proxima_nova", this.name, this.font_size);
    this.addChild(name_sprite);

    this.countdown = new Countdown(this.state,
      name_sprite.width + this.font_size / 2, 0, this.font_size, this.duration);
    this.addChild(this.countdown);
    this.cameraOffset = new Phaser.Point(20, 20);
    this.alpha = 0;
    this.state.game.add.tween(this).to({alpha: 1.0},
      Phaser.Timer.SECOND * 1.0, "Linear", true);
    this.countdown.expiry_signal.addOnce(this.expire, this);
  }

  expire() {
    this.expiry_signal.dispatch();
  }

  update() {
    if (this.countdown) {
      this.countdown.update();
    }
  }

}

export { Task };
