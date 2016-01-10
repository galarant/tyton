class Key extends Phaser.Group {

  //TODO: clean up this def
  constructor(keyboard, state, chr, x, y, width, height,
    sprite_key="squircle", on_down=null, on_down_context=null, key_code=null) {

    //group attributes
    super(state, state.world);
    this.game = state.game;
    this.x = x;
    this.y = y;
    this.keyboard = keyboard;
    this.key_code = key_code;
    if (!on_down_context) {
      on_down_context = this;
    }

    //add squircle
    this.squircle = new Phaser.Sprite(this.game, this.x, this.y, sprite_key);
    this.squircle.width = width;
    this.squircle.height = height;
    this.game.world.add(this.squircle);
    this.addChild(this.squircle);

    this.fill_sprite = new Phaser.Sprite(this.game, this.x, this.y, "squircle_fill");
    this.fill_sprite.width = width;
    this.fill_sprite.height = height;
    this.fill_sprite.alpha = 0;
    this.game.world.add(this.fill_sprite);
    this.addChild(this.fill_sprite);

    //add chr
    this.text = new Phaser.BitmapText(this.game,
                                     this.x + width / 2,
                                     this.y + height / 2,
                                     "proxima_nova", chr, width / 3);
    this.text.anchor = new Phaser.Point(0.5, 0.5);
    this.addChild(this.text);

    //add pointer callbacks
    this.squircle.inputEnabled = true;
    if (!on_down) {
      on_down = function() {this.keyboard.input_field.add_chr(chr);};
    }
    this.squircle.events.onInputDown.add(on_down, on_down_context);
    let on_down_fill = function() {
      this.fill_sprite.alpha = 0;
      if (this.game) {
        this.fill_tween = this.game.add.tween(this.fill_sprite).to({alpha: 1.0}, 100, "Linear", true, 0, 0, true);
      }
    };
    this.squircle.events.onInputDown.add(on_down_fill, this);

    if (key_code) {
      try {
        let key = this.game.input.keyboard.addKey(eval("Phaser.KeyCode." + this.key_code));
        key.onDown.add(on_down, on_down_context);
        key.onDown.add(on_down_fill, this);
      } catch(err) {
        console.warn("Cannot evaluate Phaser.KeyCode." + key_code);
      }
    }
  }

  destroy() {
    let key = this.game.input.keyboard.removeKey(eval("Phaser.KeyCode." + this.key_code));
    this.squircle.events.onInputDown.removeAll();
    super.destroy();
  }

}

export { Key };
