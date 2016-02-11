class Barrier extends Phaser.Sprite {

  constructor(game, x, y, width, height, angle=0) {
    //sprite attributes
    super(game,
          x + width / 2,
          y + height / 2,
          "barrier");
    this.width = width;
    this.height = height;
    this.angle = angle;

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setRectangle(this.width, this.height);
    this.body.static = true;
    this.body.setBodyContactCallback(this.game.tyton.body, this.destroy, this);

    //world stuff
    game.world.add(this);

  }

}

export { Barrier };
