class PreloadState extends Phaser.State {

  constructor() {
    super();
    this.ready = false;
  }

  preload() {
    //show the preloader while assets are loading
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.preloader = this.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "preloader");
    this.preloader.alpha = 0; //preloader is ugly as shit for some reason so we're hiding it for now
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets

    //menu assets
    this.load.image("background", "static/assets/background.png");
    this.load.image("color_gradient", "static/assets/color_gradient.jpg");

    //game world assets
    this.load.image("world_bg", "static/assets/world_bg.jpg");
    this.load.image("transition", "static/assets/transition.jpeg");
    this.load.image("play_bg", "static/assets/play_bg.jpg");
    this.load.image("ground", "static/assets/ground.jpg");
    this.load.image("tyton", "static/assets/tyton.png");

    //lib assets
    this.load.image("squircle", "static/assets/squircle.png");

    this.load.bitmapFont("glametrix", "static/assets/fonts/glametrix.png", "static/assets/fonts/glametrix.xml");

  }

  create() {
    this.preloader.cropEnabled = false;
  }

  update() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}

export { PreloadState };
