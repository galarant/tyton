class PlayState extends Phaser.State {

  preload() {}

  create() {
    this.game.stage.backgroundColor = "#124184";
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.gravity.y = 1000;
    this.game.physics.box2d.restitution = 0.4;
    this.game.physics.box2d.setBoundsToWorld();

    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    this.game.physics.box2d.debugDraw.aabbs = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    this.ground = new Phaser.Physics.Box2D.Body(this.game,
                                                null,
                                                this.game.world.centerX,
                                                this.game.world.height - 50);
    this.ground.setRectangle(this.game.world.width, 100);
    this.ground.static = true;

    this.circle = new Phaser.Physics.Box2D.Body(this.game,
                                                null,
                                                50,
                                                this.game.world.centerY);
    this.circle.setCircle(32);
    this.barrier = new Phaser.Physics.Box2D.Body(this.game,
                                                 null,
                                                 this.game.world.width - 300,
                                                 this.game.world.height - 200);
    this.barrier.setRectangle(25, 200);
    this.barrier.static = true;

    this.circle.setBodyContactCallback(this.barrier, this.barrierContact, this);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.game.debug.box2dWorld();

    if (this.cursors.left.isDown)
    {
      this.circle.velocity.x -= 20;
    }

    if (this.cursors.right.isDown)
    {
      this.circle.velocity.x += 20;
    }
  }

  barrierContact(body1, body2, fixture1, fixture2, begin) {
    if(begin) {
      body2.destroy();
    }
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
