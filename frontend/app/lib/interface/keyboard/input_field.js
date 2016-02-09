class InputField extends Phaser.Group {

  constructor(game, keyboard, x, y,
    chr_size, max_length=20,
    placeholder="Lorizzle ipsizzle dolor sit amet, shiznit.", value="") {

    //group attributes
    super(game, game.world);
    this.x = x;
    this.y = y;
    this.max_length = max_length;

    //add cursor
    this.cursor = new Phaser.BitmapText(this.game,
                                        this.x,
                                        this.y + chr_size,
                                        "proxima_nova", "_", chr_size);
    let cursor_blink = this.game.add.tween(this.cursor);
    cursor_blink.to({alpha: 0}, 10, "Linear", false, 800);
    cursor_blink.to({alpha: 1}, 10, "Linear", false, 500);
    cursor_blink.repeatAll(-1);
    cursor_blink.start();
    this.addChild(this.cursor);
    keyboard.tweens.add(cursor_blink);

    //add placeholder text
    this.placeholder_sprite = new Phaser.BitmapText(this.game,
                                             this.x,
                                             this.y + chr_size,
                                             "proxima_nova", placeholder, chr_size);
    this.placeholder_sprite.tint = 0x484848;
    this.addChild(this.placeholder_sprite);

    //initiate value
    this.value_sprite = new Phaser.BitmapText(this.game,
                                              this.x,
                                              this.y + chr_size,
                                              "proxima_nova", value, chr_size);
    this.addChild(this.value_sprite);
  }

  add_chr(chr) {
    if (this.value_sprite.text.length <= this.max_length) {
      this.value_sprite.text += chr;
    }
  }

  backspace() {
    this.value_sprite.text = this.value_sprite.text.slice(0, -1);
  }

  update() {
    this.placeholder_sprite.alpha = 1;
    if (this.value_sprite.text) {
      this.placeholder_sprite.alpha = 0;
    }
    this.cursor.x = this.x + this.value_sprite.width;
  }

}

export { InputField };
