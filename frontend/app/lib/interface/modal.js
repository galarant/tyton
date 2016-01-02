class Modal extends Phaser.Group {

  constructor(state, message_text="PAUSED", alpha=0.9, fade_duration=Phaser.Timer.SECOND * 0.5, close_on_tap=true) {

    //group attributes
    super(state, state.world);
    this.game = state.game;

    //define children
    this.darken = new Phaser.Sprite(this.game, 0, 0, "darken");
    this.darken.width = this.game.camera.width;
    this.darken.height = this.game.camera.height;
    this.darken.alpha = 0;
    this.addChild(this.darken);

    //custom attributes and init methods
    this.message_text = message_text;
    this.fade_duration = fade_duration;
    this.alpha = alpha;
    this.close_on_tap = close_on_tap;
    this.tweens = new Phaser.TweenManager(this.game);

    this.tween_alpha(this.darken, `+${this.alpha}`, this.show_message, this);
    this.game.paused = true;

  }

  tween_alpha(sprite, tween_to, callback, callback_context) {
    let alpha_tween = this.game.add.tween(sprite).to({alpha: tween_to}, this.fade_duration, "Linear", true);
    if (callback)
      alpha_tween.onComplete.add(callback, callback_context);
    this.tweens.add(alpha_tween);
  }

  show_message() {
    if (this.message) {
      this.message.destroy();
    }
    if (this.game) {
      this.message = new Phaser.BitmapText(this.game,
                                           this.game.camera.x + this.game.camera.width / 2,
                                           this.game.camera.y + this.game.camera.height / 2,
                                           "glametrix", this.message_text, 60);
      this.message.maxWidth = this.game.camera.width / 1.5;
      this.message.anchor = new Phaser.Point(0.5, 0.5);
      this.addChild(this.message);
    }
  }

  update() {
    this.tweens.update();
    this.show_message();

    if (this.game &&
        this.game.input.activePointer &&
        this.game.input.activePointer.justReleased()) {
      if (this.close_on_tap && !this.closing) {
        this.close();
      }
    }
  }

  close() {
    this.closing = true;
    this.tween_alpha(this.darken, `-${this.alpha}`, this.finalize, this);
  }

  finalize() {
    if (this.game) {
      this.game.paused = false;
    }
    this.destroy();
  }

}

export { Modal };
