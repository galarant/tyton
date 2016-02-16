class Button extends Phaser.Group {

  //TODO: clean up this def
  constructor(game, x, y, label, myParent=null, width=30, height=30,
    textField=null, callback=null, callbackContext=null, keyCode=null,
    outlineKey="squircle", fillKey="squircle_fill", labelFont="proxima_nova") {

    //group attributes
    if (myParent) {
      super(game, myParent);
      this.x = x;
      this.y = y;
    } else {
      super(game, game.camera);
      this.fixedToCamera = true;
      this.cameraOffset = new Phaser.Point(x, y);
    }

    this.keyCode = keyCode;
    this.tweens = new Phaser.TweenManager();
    this.textField = textField;

    //add outline sprite
    this.outlineSprite = new Phaser.Sprite(this.game, 0, 0, outlineKey);
    this.outlineSprite.width = width;
    this.outlineSprite.height = height;
    this.addChild(this.outlineSprite);

    //add fill sprite
    this.fillSprite = new Phaser.Sprite(this.game, 0, 0, fillKey);
    this.fillSprite.width = width;
    this.fillSprite.height = height;
    this.fillSprite.alpha = 0;
    this.addChild(this.fillSprite);

    //add label
    if (label instanceof Phaser.Sprite) {
      this.label = label;
    } else if (label instanceof String) {
      this.label = new Phaser.BitmapText(this.game,
                                         width / 2, height / 2,
                                         labelFont, label, width / 3);
      this.text.anchor = new Phaser.Point(0.5, 0.5);
    } else {
      throw("PhaserInterface.Button label must be of type String or type Phaser.Sprite");
    }
    this.addChild(this.label);

    //set up callback functionality
    if (callbackContext) {
      this.callbackContext = callbackContext;
    } else {
      this.callbackContext = this;
    }

    if (callback) {
      this.callback = callback;
    } else if (this.textField) {
      this.callbackContext = this;
      this.callback = function() {
        this.textField.add_chr(this.label.text);
      };
    } else {
      console.warn("Created a Phaser.InterfaceButton with no callback or textField specified");
    }

    this.game.input.onDown.add(this.handle_pointer_input, this);

    if (keyCode) {
      this.inputKey = this.game.input.keyboard.addKey(this.keyCode);
      if (this.callback) {
        this.inputKey.onDown.add(this.callback, this.callbackContext);
      }
      this.inputKey.onDown.add(this.fill, this);
    }

  }

  handle_pointer_input(this_pointer) {
    let in_x_bounds = (
      this_pointer.x >= this.worldPosition.x &&
      this_pointer.x <= this.worldPosition.x + this.width);
    let in_y_bounds = (
      this_pointer.y >= this.worldPosition.y &&
      this_pointer.y <= this.worldPosition.y + this.height);
    if (in_x_bounds && in_y_bounds) {
      if (this.callback) {
        this.callback.call(this.callbackContext);
      }
      this.fill.call(this);
    }
  }

  fill() {
    //flash the fill sprite with a quick yoyo tween
    if (this.fillSprite) {
      this.fillSprite.alpha = 0;
      this.fillTween = this.game.add.tween(this.fillSprite)
        .to({alpha: 1.0}, 100, "Linear", true, 0, 0, true);
      this.tweens.add(this.fillTween);
    }
  }

  destroy() {
    this.game.input.keyboard.removeKey(this.keyCode);
    super.destroy();
  }

}

export { Button };
