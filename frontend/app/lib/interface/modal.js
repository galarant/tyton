class Modal extends Phaser.Group {

  constructor(game, intrface=null, bg_alpha=0.9,
              fade_duration=Phaser.Timer.SECOND*0.5, close_signal=null, pause_game=true) {

    //group attributes
    super(game, game.world);
    this.fade_duration = fade_duration;
    this.submit_signal = new Phaser.Signal();
    this.fixedToCamera = true;
    this.cameraOffset = new Phaser.Point(0, 0);

    //define background sprite
    this.bg = new Phaser.Sprite(game, 0, 0, "modal_bg");
    this.bg.width = game.camera.width;
    this.bg.height = game.camera.height;
    this.bg.alpha = 0;
    this.addChild(this.bg);

    //define interface
    if (!intrface) {
      this.intrface = new Phaser.BitmapText(game,
        game.camera.x + game.camera.width / 2,
        game.camera.y + game.camera.height / 2,
        "proxima_nova", "PAUSED", 60);
      this.intrface.anchor.setTo(0.5, 0.5);
    } else {
      this.intrface = intrface;
    }
    this.intrface.alpha = 0;
    this.addChild(this.intrface);

    //define close event
    if (close_signal) {
      close_signal.addOnce(this.close, this);
    } else if (this.intrface && this.intrface.submit_signal) {
      this.intrface.submit_signal.addOnce(this.close, this);
    } else {
      game.input.onDown.addOnce(this.close, this);
    }

    //fade in bg
    let fade_in_tween = game.add.tween(this.bg).to({alpha: bg_alpha}, this.fade_duration, "Linear", true);
    fade_in_tween.onComplete.add(this.show_intrface, this);

    //define game pause behavior
    if (pause_game) {
      game.paused = true;
      game.modal = this;
      game.state.onPauseUpdateCallback = this.update_paused_state;
    }
  }

  show_intrface() {
    this.intrface.alpha = 1;
  }

  //the context for this function is the current game state, *not* the modal instance
  update_paused_state() {
    //update interface
    if (this.game.modal && this.game.modal.intrface) {
      this.game.modal.intrface.update();
    }

    //update tweens
    this.game.tweens.update();
  }

  close(return_value) {
    let fade_out_tween = this.game.add.tween(this).to({alpha: 0}, this.fade_duration, "Linear", true);
    fade_out_tween.onComplete.add(this.destroy, this, 0, return_value);
  }

  destroy(return_value) {
    this.game.paused = false;
    this.game.modal = null;
    this.game.state.onPauseUpdateCallback = null;
    this.submit_signal.dispatch(return_value);
    super.destroy();
  }

}

export { Modal };
