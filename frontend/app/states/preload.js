function Preload() {
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    //show the preloader while assets are loading
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.preloader = this.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "preloader");
    this.preloader.alpha = 0; //preloader is ugly as shit for some reason so we're hiding it for now
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets
    this.load.image("background", "static/assets/background.png");
    this.load.image("color_gradient", "static/assets/color_gradient.jpg");
    this.load.image("transition", "static/assets/transition.jpeg");
    this.load.bitmapFont("glametrix", "static/assets/fonts/glametrix.png", "static/assets/fonts/glametrix.xml");
    this.load.image("play_bg", "static/assets/play_bg.png");
    this.load.image("play_gradient_mask", "static/assets/play_gradient_mask.jpg");
    this.load.image("ground", "static/assets/ground.jpg");
  },

  create: function() {
    this.preloader.cropEnabled = false;
  },

  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
