function Play() {}

Play.prototype = {

  preload: function() {
  },

  create: function() {
    var self = this;

    self.background = self.game.add.sprite(self.game.world.centerX,
                                           self.game.world.centerY,
                                           "background");
    self.background.anchor.setTo(0.5);
    self.background.width = self.game.width;
    self.background.height = self.game.height;

    self.glow = self.game.add.sprite(self.game.world.centerX,
                                     self.game.world.centerY,
                                     "transition");
    self.glow.anchor.setTo(0.5);
    self.glow.width = self.game.width;
    self.glow.height = self.game.height;

    self.glow.alpha = 1;

    self.add.tween(self.glow).to(
      {alpha: 0}, 1200, "Quart.easeInOut", true);

  },

  update: function() {

  },

  resize: function() {
    var self = this;

    self.background = self.game.add.sprite(self.game.world.centerX,
                                           self.game.world.centerY,
                                           "background");
    self.background.anchor.setTo(0.5);
    self.background.width = self.game.width;
    self.background.height = self.game.height;
  },
};

module.exports = Play;
