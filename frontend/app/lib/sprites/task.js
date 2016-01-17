import moment from "moment/moment";

import { Modal } from "../interface/modal";
import { Keyboard } from "../interface/keyboard/keyboard";
import { Countdown } from "../interface/countdown";

class Task extends Phaser.Group {

  constructor(state, font_size=null, name=null,
              created_at=null, started_at=null, finished_at=null,
              succeeded=null, duration=70, difficulty=null) {

    super(state.game, state.world);
    this.state = state;
    this.fixedToCamera = true;
    this.duration = duration;

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
    this.set_interface();
  }

  set_interface() {
    let name_sprite = new Phaser.BitmapText(this.state.game,
      0, 0, "proxima_nova", this.name, this.font_size);
    this.addChild(name_sprite);

    let countdown = new Countdown(this.state,
      name_sprite.width + this.font_size / 2, 0, this.font_size, this.duration);
    this.addChild(countdown);
    this.cameraOffset = new Phaser.Point(20, 20);
  }

}

export { Task };
