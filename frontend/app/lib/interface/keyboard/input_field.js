class InputField extends Phaser.Group {

  constructor(state, x, y, chr_size, max_length=20, placeholder="Write Your Name", value="") {

    //group attributes
    super(state, state.world);
    this.game = state.game;
    this.x = x;
    this.y = y;

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

    //add placeholder text
    this.placeholder = new Phaser.BitmapText(this.game,
                                             this.x,
                                             this.y + chr_size,
                                             "proxima_nova", placeholder, chr_size);
    this.placeholder.tint = 0x484848;
    this.addChild(this.placeholder);
  }

}

export { InputField };
