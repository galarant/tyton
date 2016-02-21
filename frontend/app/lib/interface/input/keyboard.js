import _ from "lodash";
import { Button } from './button';
import { ButtonRow } from './button_row';
import { TextField } from './text_field';

class Keyboard extends Phaser.Group {

  constructor(game, buttonRows=null, textField=null, font="proxima_nova",
    squareOutlineKey="squircle", rectOutlineKey="rectircle", fillKey="squircle_fill",
    inputMaxLength=25, inputPlaceholder="Tap the screen or type on your keyboard",
    defaultValue="") {

    super(game, game.world);
    this.submitSignal = new Phaser.Signal();
    this.tweens = new Phaser.TweenManager(game);
    this.font = font;
    this.squareOutlineKey = squareOutlineKey;
    this.rectOutlineKey = rectOutlineKey;
    this.fillKey = fillKey;

    this.textField = new TextField(game, 0, 0,
      font, (this.game.camera.width / inputMaxLength) * 1.25,
      inputMaxLength, inputPlaceholder, defaultValue);
    this.add(this.textField);

    if (!buttonRows) {
      this.buttonRows = this.createQwertyRows();
    } else {
      this.buttonRows = buttonRows;
    }

    let buttonRowHeight = this.buttonRows[0].children[0].height,
      buttonRowY = buttonRowHeight * 1.5,
      buttonRowSpacing = buttonRowHeight / 8,
      maxRowWidth = _.max(_.map(this.buttonRows, function(buttonRow) {
        return buttonRow.width;
      }));
    _.forEach(this.buttonRows, function(buttonRow){
      buttonRow.x = (maxRowWidth - buttonRow.width) / 2;
      buttonRow.y = buttonRowY;
      buttonRowY += (buttonRow.height + buttonRowSpacing);
      this.add(buttonRow);
    }, this);

    this.fixedToCamera = true;
    this.cameraOffset.setTo((this.game.camera.width - this.width) / 2, 0);

  }

  createQwertyRows() {
    let keyCodeRows = [
      [81,87,69,82,84,89,85,73,79,80],
      [65,83,68,70,71,72,74,75,76],
      [90,88,67,86,66,78,77],
      [8,188,32,190,13]
    ];
    let buttonRows = [];

    _.forEach(keyCodeRows, function(keyCodeRow) {
      let buttons = _.map(keyCodeRow, this.createQwertyButton, this);
      buttonRows.push(new ButtonRow(this.game, buttons));
    }, this);
    return buttonRows;

  }

  createQwertyButton(keyCode) {
    let thisButtonWidth = this.game.camera.width / 12,
      thisButtonHeight = thisButtonWidth,
      chrCode = keyCode - 48 * Math.floor(keyCode / 48),
      label = String.fromCharCode((96 <= keyCode) ? chrCode: keyCode),
      thisButtonCallback = null,
      thisButtonCallbackContext = null,
      outlineKey = this.squareOutlineKey;

    if (keyCode === Phaser.KeyCode.SPACEBAR) {
      thisButtonWidth *= 3;
      outlineKey = this.rectOutlineKey;
    } else if (keyCode === Phaser.KeyCode.BACKSPACE) {
      thisButtonWidth *= 2;
      outlineKey = this.rectOutlineKey;
      thisButtonCallback = this.textField.backspace;
      thisButtonCallbackContext = this.textField;
      label = "\u2190";
    } else if (keyCode === Phaser.KeyCode.ENTER) {
      thisButtonWidth *= 2;
      outlineKey = this.rectOutlineKey;
      thisButtonCallback = this.submit;
      thisButtonCallbackContext = this;
      label = "ENTER";
    }
    return new Button(this.game, null, 0, 0, thisButtonWidth, thisButtonHeight,
      label, keyCode, thisButtonCallback, thisButtonCallbackContext, this.textField,
      outlineKey, this.fillKey, this.font);
  }

  submit() {
    this.submitSignal.dispatch(this.textField.valueSprite.text);
  }

}

export { Keyboard };
