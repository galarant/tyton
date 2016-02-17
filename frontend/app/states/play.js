//general imports
import _ from "lodash";

//game world object imports
import { Tyton } from "lib/sprites/tyton";
import { Ground } from "lib/sprites/ground";
import { Task } from "lib/sprites/task";
import { Barrier } from "lib/sprites/barrier";

//interface object imports
import { Modal } from "lib/interface/display/modal";
import { Dialog } from "lib/interface/display/dialog";
//import { Keyboard } from "lib/interface/keyboard/keyboard";
import { Button } from "lib/interface/input/button";

class PlayState extends Phaser.State {

  preload() {
    //global input config
    this.game.input.maxPointers = 1;
    this.game.input.justReleasedRate = 30;
    this.game.font_size = this.game.camera.width / 25;

    //global orientation config
    this.game.scale.forceOrientation(true, false);

    this.game.scale.enterIncorrectOrientation.add(function() {
      let orientation_message = new Phaser.BitmapText(this.game, 0, 0,
        "proxima_nova", "TO PLAY TYTON\nPLEASE PUT YOUR DEVICE\nIN LANDSCAPE MODE", this.game.font_size * 1.5, "center");
      orientation_message.anchor.setTo(0.5, 0.5);
      this.game.modal = new Modal(this, orientation_message, 1.0, Phaser.Timer.SECOND * 0.01, this.game.scale.leaveIncorrectOrientation);
      this.game.modal.intrface.update = function() {
        //only do this if we are in portrait
        if (this.game.camera.width < this.game.camera.height) {
          this.game.modal.intrface.x = this.game.camera.width / 2;
          this.game.modal.intrface.y = this.game.camera.height / 2;
        }
      };
    }, this);

    this.game.scale.leaveIncorrectOrientation.add(function() {
      this.game.modal.close();
    }, this);
  }

  create() {

    //define input
    this.game.cursors = this.game.input.keyboard.createCursorKeys();

    //config game world
    this.world.height = this.camera.height * 2;
    this.world.width = this.camera.width * 2;
    this.world.setBounds(0, 0, this.world.width, this.world.height);

    //config physics
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.setBoundsToWorld();

    //config game debug
    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add bg
    this.bg = this.game.add.tileSprite(0, 0,
      this.world.width, this.world.height, "play_bg");
    this.bg.tileScale = new Phaser.Point(2.0, 2.0);

    //add ground
    this.game.ground = new Ground(this.game);

    //add tyton
    this.game.tyton = new Tyton(this.game);

    //add barriers
    this.game.barrier = new Barrier(this.game,
      this.game.world.width / 2.5, 0,
      this.game.camera.width / 100, this.game.world.height - this.game.ground.height);

    this.test_modal = new Modal(this.game,
      new Button(this.game, null,
        this.game.camera.width / 2, this.game.camera.height / 2,
        this.game.camera.width / 10, this.game.camera.width / 10,
        "@", 13, this.button_callback, this));

  }

  button_callback() {
    console.log("button pressed");
  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.font_size = this.game.camera.width / 25;
  }

  task_expired() {
    this.task.destroy();
    this.game.tyton.say(["YOU DID BAD"]);
  }

}

export { PlayState };
