function BootState() {
}

BootState.prototype = {
  preload: function() {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.trackParentInterval = 500;
    this.load.image('preloader', 'static/assets/preloader.gif');
  },
  create: function() {
    this.game.state.start('preload');
  }
};

export { BootState };
