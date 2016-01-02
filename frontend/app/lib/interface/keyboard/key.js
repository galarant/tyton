class Key extends Phaser.Group {

  constructor(state, chr, x, y, width, height, sprite_key="squircle") {

    //group attributes
    super(state, state.world);
    this.game = state.game;
    this.x = x;
    this.y = y;

    //add squircle
    this.squircle = new Phaser.Sprite(this.game, this.x, this.y, sprite_key);
    this.squircle.width = width;
    this.squircle.height = height;
    state.game.world.add(this.squircle);

    this.addChild(this.squircle);

    //add chr
    this.text = new Phaser.BitmapText(this.game,
                                     this.x + width / 2,
                                     this.y + height / 2,
                                     "proxima_nova", chr, width / 3);
    this.text.anchor = new Phaser.Point(0.5, 0.5);
    this.addChild(this.text);
  }

}

export { Key };
