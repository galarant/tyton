class TextField extends Phaser.Group {

  constructor(game, x, y, font, fontSize, maxLength=20, placeholderText="", value="") {

    //group attributes
    super(game, game.world);
    this.x = x;
    this.y = y;
    this.maxLength = maxLength;
    this.tweens = new Phaser.TweenManager(game);

    //add cursor
    this.cursor = new Phaser.BitmapText(this.game, x, y + fontSize, font, "_", fontSize);
    this.addChild(this.cursor);

    let cursorBlink = this.game.add.tween(this.cursor);
    cursorBlink.to({alpha: 0}, 10, "Linear", false, 800);
    cursorBlink.to({alpha: 1}, 10, "Linear", false, 500);
    cursorBlink.repeatAll(-1);
    cursorBlink.start();
    this.tweens.add(cursorBlink);

    //add placeholder text
    this.placeholderSprite = new Phaser.BitmapText(this.game, x, y + fontSize,
      font, placeholderText, fontSize);
    this.placeholderSprite.tint = 0x484848;
    this.addChild(this.placeholderSprite);

    //initiate value
    this.valueSprite= new Phaser.BitmapText(game, x, y + fontSize, font, value, fontSize);
    this.addChild(this.valueSprite);
  }

  addChr(chr) {
    if (this.valueSprite.text.length <= this.maxLength) {
      this.valueSprite.text += chr;
    }
  }

  backspace() {
    this.valueSprite.text = this.valueSprite.text.slice(0, -1);
  }

  update() {
    this.placeholderSprite.alpha = 1;
    if (this.valueSprite.text) {
      this.placeholderSprite.alpha = 0;
    }
    this.cursor.x = this.x + this.valueSprite.width;
  }

}

export { TextField };
