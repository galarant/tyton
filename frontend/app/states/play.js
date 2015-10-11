class PlayState extends Phaser.State {

  preload() {}

  create() {
    this.game.stage.backgroundColor = "#124184";
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.gravity.y = 400;
    this.game.physics.box2d.restitution = 0.8;
    this.game.physics.box2d.setBoundsToWorld();

    this.ground = this.game.add.sprite(this.game.world.centerX,
                                       this.game.world.height - 100,
                                       "ground");
    this.ground.width = this.game.width;
    this.ground.height = 200;
    this.game.physics.box2d.enable(this.ground);
    this.ground.body.static = true;

    this.circle = this.game.physics.box2d.createCircle(this.game.world.centerX,
                                                       this.game.world.centerY,
                                                       32);
  }

  update() {
    this.game.debug.box2dWorld();
  }

  resize() {
    this.bg.x = this.game.world.centerX;
    this.bg.y = this.game.world.centerY;
    this.bg.width = this.game.width;
    this.bg.height = this.game.height;

    this.gradient_mask.x = this.game.world.centerX;
    this.gradient_mask.y = this.game.world.centerY;
    this.gradient_mask.width = this.game.width * 2;
    this.gradient_mask.height = this.game.height * 2;

    this.gradient_mask_2.x = this.game.world.centerX;
    this.gradient_mask_2.y = this.game.world.centerY;
    this.gradient_mask_2.width = this.game.width * 2;
    this.gradient_mask_2.height = this.game.height * 2;
  }

}

export { PlayState };
