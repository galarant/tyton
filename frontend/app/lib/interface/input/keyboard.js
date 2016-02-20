import _ from "lodash";
import { Button } from './button';
import { TextField } from './text_field';

class Keyboard extends Phaser.Group {

  constructor(game, keyRows=null, textField=null, inputMaxLength=20,
    inputPlaceholder="Tap the screen or type on your keyboard", defaultValue="") {
    /*
    [
      [81,87,69,82,84,89,85,73,79,80],
      [65,83,68,70,71,72,74,75,76],
      [90,88,67,86,66,78,77],
      [8,188,32,190,13]
    ]
    */
    //group attributes
    super(game, game.world);
    this.submit_signal = new Phaser.Signal();
    this.tweens = new Phaser.TweenManager(game);

    if (!keyRows) {
      this.keyRows = this.addKeyRows();
    } else {
      this.keyRows = keyRows;
    }

    let keyRowY = 0;
    let keyRowSpacing = this.game.camera.height / 20;
    _.forEach(keyRows, function(keyRow){
      keyRow.x = -(keyRow.width / 4);
      keyRowY += (keyRow.height + keyRowSpacing);
      this.add(keyRow);
    }, this);

    this.fixedToCamera = true;
    this.cameraOffset.setTo(this.game.camera.width / 2, this.game.camera.height / 2);

  }
  /*
  this.addKeyRows() {

    //define children
    let keyWidth = this.game.camera.width / 12;
    let keySpacing = this.game.camera.width * 0.015;
    let keyPos = null;

    //add input field
    let textFieldWidth = this.game.camera.width / 25;

    //handle pointer input
    this.game.input.onDown.add(this.handle_pointer_input, this, 0);

    //add key_rows
    _.each(key_code_rows, function(key_code_row, key_code_row_index) {
      if (key_code_row.length > 10) {
        throw("Phaser Keyboard rows have a maximum length of 10 characters");
      }

      let key_row = new Phaser.Group(game, game.world);

      //populate key_row
      let previous_key_right_edge = 0;
      _.each(key_code_row, function(key_code, key_code_index) {
        let this_key_width = key_width;
        let this_key_sprite = "squircle";
        let this_key_callback = null;
        let this_key_callback_context = null;
        //let chr = String.fromCharCode((96 <= key_code && key_code <= 105) ? key_code - 48: key_code);
        let chr_code = key_code - 48 * Math.floor(key_code / 48);
        let chr = String.fromCharCode((96 <= key_code) ? chr_code: key_code);
        if (key_code === Phaser.KeyCode.SPACEBAR) {
          this_key_width = key_width * 3;
          this_key_sprite = "rectircle";
        }
        else if (key_code === Phaser.KeyCode.BACKSPACE) {
          this_key_width = key_width * 2;
          this_key_sprite = "rectircle";
          this_key_callback = this.input_field.backspace;
          this_key_callback_context = this.input_field;
          chr = "\u2190";
        }
        else if (key_code === Phaser.KeyCode.ENTER) {
          this_key_width = key_width * 2;
          this_key_sprite = "rectircle";
          this_key_callback = this.submit;
          this_key_callback_context = this;
          chr = "\u2713";
        }
        let key = new Key(this, game, chr, previous_key_right_edge, 0, this_key_width,
          key_height, this_key_sprite, this_key_callback, this_key_callback_context, key_code);
        this.keys.push(key);
        previous_key_right_edge += this_key_width + key_spacing;
        key_row.addChild(key);
      }, this);
      this.addChild(key_row);

      key_row.x = (this.game.camera.width - key_row.width) / 2;
      key_row.y = (key_height + key_spacing) * key_code_row_index + (key_height * 1.5);

    }, this);
  }
  */

  submit() {
    this.submit_signal.return_value = this.input_field.value_sprite.text;
    this.submit_signal.dispatch(this.input_field.value_sprite.text);
  }

}

export { Keyboard };
