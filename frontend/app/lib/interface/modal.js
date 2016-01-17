class Modal extends Phaser.Group {

  constructor(state, intrface=null, alpha=0.9,
              fade_duration=Phaser.Timer.SECOND*0.5, close_signal=null, closable=true) {

    //group attributes
    super(state.game, state.world);
    this.state = state;
    this.fade_duration = fade_duration;
    this.close_signal = close_signal;
    this.alpha = alpha;
    this.submit_signal = new Phaser.Signal();

    //sprite to darken screen
    this.darken = new Phaser.Sprite(state.game, 0, 0, "darken");
    this.darken.width = state.game.camera.width;
    this.darken.height = state.game.camera.height;
    this.darken.alpha = 0;
    this.addChild(this.darken);

    //modal interface
    if (!intrface) {
      this.intrface = new Phaser.BitmapText(state.game,
        state.game.camera.x + state.game.camera.width / 2,
        state.game.camera.y + state.game.camera.height / 2,
        "proxima_nova", "PAUSED", 60);
      this.intrface.anchor.setTo(0.5, 0.5);
      this.intrface.update = function() {
        this.x = state.game.camera.x + state.game.camera.width / 2;
        this.y = state.game.camera.y + state.game.camera.height / 2;
        this.anchor.setTo(0.5, 0.5);
      };
    } else {
      this.intrface = intrface;
    }
    this.intrface.alpha = 0;
    this.addChild(this.intrface);

    //close event
    if (closable) {
      if (this.close_signal) {
        //add a listener for the close signal if one was passed
        close_signal.addOnce(this.close, this);
      } else if (this.intrface && this.intrface.submit_signal) {
        this.intrface.submit_signal.addOnce(this.close, this);
      } else {
        //otherwise default to close on click
        state.game.input.onDown.addOnce(this.close, this);
      }
    }

    this.tween_alpha(this.darken, `+${this.alpha}`, this.show_intrface, this);
    this.state.paused = true;
    state.game.paused = true;
  }

  tween_alpha(sprite, tween_to, callback, callback_context) {
    let alpha_tween = this.state.game.add.tween(sprite).to({alpha: tween_to}, this.fade_duration, "Linear", true);
    if (callback)
      alpha_tween.onComplete.add(callback, callback_context);
  }

  show_intrface() {
    this.intrface.alpha = 1;
  }

  update() {
    //update interface
    if (this.intrface) {
      this.intrface.update();
    }

    //update tweens
    if (this.state.game) {
      this.state.game.tweens.update();
    }
  }

  close(return_value) {
    this.tween_alpha(this, `-${this.alpha}`, this.destroy, this);
    this.return_value = return_value;
  }

  destroy() {
    this.state.paused = false;
    this.state.game.paused = false;
    this.state.game.modal = null;
    this.submit_signal.dispatch(this.return_value);
    super.destroy();
  }

}

export { Modal };
