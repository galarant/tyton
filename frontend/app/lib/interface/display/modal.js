import _ from "lodash";

class Modal extends Phaser.Group {

  constructor(game, intrface=null, bgAlpha=0.9,
              fadeDuration=Phaser.Timer.SECOND*0.5, submitSignal=null, pauseGame=true) {

    //group attributes
    super(game, game.world);
    this.submitSignal = submitSignal;
    this.fadeDuration = fadeDuration;
    this.fixedToCamera = true;
    this.cameraOffset = new Phaser.Point(0, 0);
    this.tweens = new Phaser.TweenManager(game);

    //define background sprite
    this.bg = new Phaser.Sprite(game, 0, 0, "modal_bg");
    this.bg.width = game.camera.width;
    this.bg.height = game.camera.height;
    this.bg.alpha = 0;
    this.addChild(this.bg);

    //define intrface
    if (!intrface) {
      this.intrface = new Phaser.BitmapText(game,
        game.camera.x + game.camera.width / 2,
        game.camera.y + game.camera.height / 2,
        "proxima_nova", "PAUSED", 60);
      this.intrface.anchor.setTo(0.5, 0.5);
    } else {
      this.intrface = intrface;
      if (this.intrface.fixedToCamera) {
        this.intrface.fixedToCamera = false;
      }
      this.intrface.position.setTo(
        (this.width - this.intrface.width) / 2,
        (this.height - this.intrface.height) / 2
      );
    }
    this.intrface.alpha = 0;
    this.addChild(this.intrface);

    //define submit event
    if (this.intrface && this.intrface.submitSignal) {
      this.submitSignal = this.intrface.submitSignal;
    } else if (!this.submitSignal) {
      this.submitSignal = game.input.onDown;
    }
    this.submitSignal.addOnce(this.submit, this);

    //fade in bg
    let fadeInTween = game.add.tween(this.bg).to({alpha: bgAlpha}, this.fadeDuration, "Linear", true);
    fadeInTween.onComplete.addOnce(this.showInterface, this);
    this.tweens.add(fadeInTween);

    //define game pause behavior
    if (pauseGame) {
      game.paused = true;
      game.modal = this;
      game.state.onPauseUpdateCallback = this.updatePausedState;
    }
  }

  showInterface() {
    this.intrface.alpha = 1;
    if (this.intrface.initialize) {
      this.intrface.initialize();
    }
  }

  //the context for this function is the current game state, *not* the modal instance
  updatePausedState() {

    let recursiveTweenUpdate = function(object) {
      if (object.tweens) {
        object.tweens.update();
      }

      if (object.children && object.children.length > 0) {
        _.forEach(object.children, function() {
          recursiveTweenUpdate(object);
        });
      }
    };

    if (this.game.modal && this.game.modal.intrface) {
      this.game.modal.intrface.update();
      recursiveTweenUpdate(this);
    }
  }

  submit(returnValue) {
    let fadeOutTween = this.game.add.tween(this).to({alpha: 0}, this.fadeDuration, "Linear", true);
    fadeOutTween.onComplete.addOnce(this.destroy, this, 0, returnValue);
    this.tweens.add(fadeOutTween);
  }

  destroy(a, b, returnValue) {
    this.game.paused = false;
    this.game.modal = null;
    this.game.state.onPauseUpdateCallback = null;
    this.submitSignal.dispatch(returnValue);
    super.destroy();
  }

}

export { Modal };
