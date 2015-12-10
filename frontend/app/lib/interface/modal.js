import _ from "lodash";

class Modal extends Phaser.Group {

  constructor(game, pause_physics=true, message_text="PAUSED", alpha=0.9, fade_duration=Phaser.Timer.SECOND * 0.5) {

    //group attributes
    super(game, game.world);

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

    this.modal_close_event = this.game.input.onTap.addOnce(this.close, this, 10);
    this.tween_alpha(this.darken, `+${this.alpha}`, this.show_message, this);

    if (pause_physics)
      this.game.physics.box2d.paused = true;

  }

  tween_alpha(sprite, tween_to, callback, callback_context) {
    let alpha_tween = this.game.add.tween(sprite).to({alpha: tween_to}, this.fade_duration, "Linear", true);
    if (callback)
      alpha_tween.onComplete.add(callback, callback_context);
  }

  show_message() {
    this.message = new Phaser.BitmapText(this.game,
                                         this.game.camera.x + this.game.camera.width / 2,
                                         this.game.camera.y + this.game.camera.height / 2,
                                         "glametrix", this.message_text, 60, "center");
    this.message.maxWidth = this.game.camera.width / 1.5;
    this.message.anchor = new Phaser.Point(0.5, 0.5);
    this.addChild(this.message);
  }

  close() {
    this.modal_close_event.getSignal().halt();
    this.game.physics.box2d.paused = false;
    this.message.destroy();
    this.tween_alpha(this.darken, `-${this.alpha}`, this.destroy, this);
  }

}

export { Modal };
