class Ground extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          game.world.centerX,
          game.world.height - 75,
          "ground");
    this.width = this.game.world.width;
    this.height = 150;

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setRectangle(this.width, this.height);
    this.body.static = true;

    //world stuff
    game.world.add(this);

  }

}

export { Ground };
