import _ from "lodash";
import { Key } from './key';
import { InputField } from './input_field';

class Keyboard extends Phaser.Group {

  constructor(state, chr_rows=["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM", "\u2190, .\u2713"]) {

    //group attributes
    super(state, state.world);
    this.game = state.game;

    //define children
    let key_width = this.game.camera.width / 12;
    let key_height = key_width;
    let key_spacing = this.game.camera.width * 0.015;
    let key_pos = null;

    //add input field
    let input_max_length = 35;
    let input_size = this.game.camera.width / 25;
    this.input_field = new InputField(state, input_size / 1.5, 0, input_size, input_max_length);
    this.addChild(this.input_field);

    //add key_rows
    _.each(chr_rows, function(chr_row, chr_row_index) {
      if (chr_row.length > 10) {
        throw("Phaser Keyboard rows have a maximum length of 10 characters");
      }

      let key_row = new Phaser.Group(state, state.world);

      //populate key_row
      let previous_key_right_edge = key_spacing / 2;
      _.each(chr_row, function(chr, chr_index) {
        let this_key_width = key_width;
        let this_key_sprite = "squircle";
        let this_key_callback = null;
        let this_key_callback_context = null;
        let key_code = chr;
        if (chr === " ") {
          this_key_width = key_width * 3;
          this_key_sprite = "rectircle";
          key_code = "SPACEBAR";
        }
        else if (chr === "." ) {
          key_code = "PERIOD";
        }
        else if (chr === "," ) {
          key_code = "COMMA";
        }
        else if (chr === "\u2190") {
          this_key_width = key_width * 2;
          this_key_sprite = "rectircle";
          this_key_callback = this.input_field.backspace;
          this_key_callback_context = this.input_field;
          key_code = "BACKSPACE";
        }
        else if (chr === "\u2713") {
          this_key_width = key_width * 2;
          this_key_sprite = "rectircle";
          this_key_callback = this.submit;
          this_key_callback_context = this;
          key_code = "ENTER";
        }
        let key = new Key(this, state, chr, previous_key_right_edge, 0, this_key_width,
          key_height, this_key_sprite, this_key_callback, this_key_callback_context, key_code);
        previous_key_right_edge += (this_key_width + key_spacing) / 2;
        key_row.addChild(key);
      }, this);
      this.addChild(key_row);

      key_row.x = (this.width - key_row.width) / 2;
      key_row.y = (key_height + key_spacing) * chr_row_index + (key_height * 1.5);

    }, this);
  }

  submit() {
    console.log("submitted");
    console.log(this.input_field.value_sprite.text);
    this.destroy();
  }

}

export { Keyboard };
