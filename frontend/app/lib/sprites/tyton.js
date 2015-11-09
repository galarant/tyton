import { TytonPhrase } from 'lib/dialog/tyton_phrase';

class Tyton extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          game.camera.x + game.camera.width / 2,
          100,
          "tyton");
    this.width = 120;
    this.height = 120;

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 1.5);
    this.body.setBodyContactCallback(game.ground, this.ground_contact_handler, this);

    //game world attributes
    game.world.add(this);
    game.camera.follow(this);

  }

  update() {
    //handle inputs
    if (this.game.cursors.left.isDown)
    {
      this.body.applyForce(-40,0);
    }

    if (this.game.cursors.right.isDown)
    {
      this.body.applyForce(40,0);
    }

    //soft landing
    if (this.body.velocity.y > 400 && (this.game.ground.y - this.y) < 500)
    {
      this.body.linearDamping += 0.4;
    }

  }

  start_speaking() {
    this.speaking_tween = this.game.add.tween(this).to( {alpha: 0.4}, 500, "Linear", true, 0, -1, true);
    this.body.static = true;
  }

  stop_speaking() {
    this.speaking_tween.stop();
    this.game.add.tween(this).to( {alpha: 1}, 125, "Linear", true);
    this.body.static = false;
  }

  ground_contact_handler() {
    this.body.linearDamping = 0;
    let phrase = new TytonPhrase(this.game, "Hello", 150, 150);
    phrase.show();
    this.start_speaking();
  }

}

export { Tyton };
