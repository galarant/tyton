import { Modal } from 'lib/interface/display/modal';
import { Dialog } from 'lib/interface/display/dialog';

class Tyton extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          game.camera.x + game.camera.width / 2,
          game.ground.y - 155,
          "tyton");
    this.width = 120;
    this.height = 120;
    this.health = 100;
    this.power = 0;
    this.alive = true;

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 1.5);
    // this.body.static = true;

    //game world attributes
    game.world.add(this);
    game.camera.follow(this);

    //key mappings
    this.successKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
    this.successKey.onDown.add(this.succeed_task, this);

    this.failureKey = game.input.keyboard.addKey(Phaser.KeyCode.F);
    this.failureKey.onDown.add(this.fail_task, this);
  }

  update() {
    //handle inputs
    if (this.game.cursors.left.isDown)
    {
      this.body.applyForce(-400,0);
    }

    if (this.game.cursors.right.isDown)
    {
      this.body.applyForce(400,0);
    }

    if (this.game.cursors.up.isDown)
    {
      this.body.applyForce(0, -375);
    }

    this.check_health();
  }

  say(string_array) {
    return new Modal(this.game, new Dialog(this.game, string_array));
  }

  check_health () {
    if (this.health <= 0 && this.alive) {
      this.die();
    }
  }
  succeed_task() {
    this.health += 10;
    this.power += 10;
  }

  take_damage(damage) {
    this.health -= damage;
  }

  fail_task() {
    let task_damage = 10;
    this.take_damage(task_damage);
  }

  die() {
    this.alive = false;
    console.log("I'm dead.");
  }

}

export { Tyton };
