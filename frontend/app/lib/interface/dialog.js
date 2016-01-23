import _ from "lodash";
import { Phrase } from "./phrase";

class Dialog extends Phaser.Group {

  constructor(camera, strings=[], font_size=60,
    fade_in_speed=Phaser.Timer.SECOND * 2.0, camera_offset=null) {

    super(camera.game, camera.world);

    //group attributes
    this.camera = camera;
    this.font_size = font_size;
    this.fade_in_speed = fade_in_speed;
    this.phrases = _.map(strings, this.string_to_phrase, this);
    this.submit_signal = new Phaser.Signal();

    this.fixedToCamera = true;
    if (camera_offset) {
      this.cameraOffset = camera_offset;
    } else {
      this.cameraOffset = new Phaser.Point(this.camera.width / 2, this.camera.height / 2);
    }
    this.current_phrase = null;
    this.on_down_binding = this.camera.game.input.onDown.add(this.next, this);
    this.next();
  }

  next() {
    if (this.current_phrase) {
      this.current_phrase.destroy();
    }

    if (this.phrases.length > 0) {
      this.current_phrase = this.phrases.shift();
      this.current_phrase.show();
    } else {
      this.on_down_binding.detach();
      this.submit_signal.dispatch();
      this.destroy();
    }
  }

  string_to_phrase(string) {
    let this_phrase = new Phrase(this.camera, string, this.font_size, this.fade_in_speed);
    this.addChild(this_phrase);
    return this_phrase;
  }

}

export { Dialog };
