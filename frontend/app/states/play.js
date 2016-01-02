import { Tyton } from 'lib/sprites/tyton';
import { Ground } from 'lib/sprites/ground';
import { PlayBg } from 'lib/sprites/play_bg';
import { Countdown } from 'lib/interface/countdown';
import { Modal } from 'lib/interface/modal';
import { Keyboard } from 'lib/interface/keyboard/keyboard';

class PlayState extends Phaser.State {

  preload() {
    //global input config
    this.game.input.maxPointers = 1;
    this.game.input.justReleasedRate = 30;

    //global orientation config
    this.game.scale.forceOrientation(true, false);

    this.game.scale.enterIncorrectOrientation.add(function() {
      this.game.modal = new Modal(this,
                                  "TO PLAY TYTON, PLEASE ROTATE YOUR DEVICE TO LANDSCAPE MODE",
                                  1.0, Phaser.Timer.SECOND * 0.01, false);
    }, this);

    this.game.scale.leaveIncorrectOrientation.add(function() {
      this.game.modal.close();
    }, this);
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
    //this.game.physics.box2d.debugDraw.aabbs = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add game objects
    this.game.play_bg = new PlayBg(this.game);
    this.game.ground = new Ground(this.game);
    this.game.tyton = new Tyton(this.game);
    this.game.tyton.body.setBodyContactCallback(this.game.ground,
                                                this.ground_contact_handler,
                                                this);
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.start_game, this);

    this.game.countdown = new Countdown(this.game);
    /*
    this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
      this.game.modal = new Modal(this);
    }, this);
    */
    //this.keyboard = new Keyboard(this); //TODO: left off here
  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

  start_game() {
    //this.game.tyton.say(["Hello", "World"]);
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
