import { Tyton } from 'lib/sprites/tyton';
import { Ground } from 'lib/sprites/ground';
import { PlayBg } from 'lib/sprites/play_bg';

import { TytonPhrase } from 'lib/dialog/tyton_phrase';

class PlayState extends Phaser.State {

  preload() {}

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

  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

}

export { PlayState };
