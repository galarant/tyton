function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setShowAll();
    this.game.scale.refresh();
    this.load.image('preloader', 'static/assets/preloader.gif');
  },
  create: function() {
    this.game.state.start('preload');
  }
};

module.exports = Boot;
