import _ from "lodash";

import { Tyton } from "lib/sprites/tyton";
import { Ground } from "lib/sprites/ground";
import { PlayBg } from "lib/sprites/play_bg";
import { Modal } from "lib/interface/modal";
import { Keyboard } from "lib/interface/keyboard/keyboard";
import { Task } from "lib/sprites/task";

class PlayState extends Phaser.State {

  preload() {
    //global input config
    this.game.input.maxPointers = 1;
    this.game.input.justReleasedRate = 30;
    this.game.font_size = this.game.camera.width / 25;

    //global orientation config
    /*
    this.game.scale.forceOrientation(true, false);

    this.game.scale.enterIncorrectOrientation.add(function() {
      let orientation_message = new Phaser.BitmapText(this.game,
        this.game.camera.x + this.game.camera.width / 2,
        this.game.camera.y + this.game.camera.height / 2,
        "proxima_nova", "TO PLAY TYTON\nPLEASE PUT YOUR DEVICE IN LANDSCAPE MODE", 60);
      this.game.modal = new Modal(this, orientation_message, 1.0, Phaser.Timer.SECOND*0.01);
    }, this);

    this.game.scale.leaveIncorrectOrientation.add(function() {
      this.game.modal.close();
    }, this);
    */
  }

  create() {

    //define input
    this.game.cursors = this.game.input.keyboard.createCursorKeys();

    //config game world
    this.stage.backgroundColor = "#000000";
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    //config physics
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.setBoundsToWorld();

    //config game debug
    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add game objects
    this.play_bg = new PlayBg(this.game);
    this.game.ground = new Ground(this.game);

    this.tyton = new Tyton(this.game);
    this.task = new Task(this);

  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

  resize() {
    if (this.game.portrait_modal) {
      this.game.portrait_modal.resize();
    }
  }

  pauseUpdate() {
    if (this.game.modal) {
      this.game.modal.update();
    }
  }

}

export { PlayState };
