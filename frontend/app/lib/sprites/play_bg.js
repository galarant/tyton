class PlayBg extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          0,
          0,
          "play_bg");
    this.width = game.world.width;
    this.height = game.world.height;

    //world stuff
    game.world.add(this);

  }

}

export { PlayBg };
