function Play() {}

Play.prototype = {

  preload: function() {
  },

  create: function() {
    var self = this;

    self.bg = self.game.add.sprite(self.game.world.centerX,
                                   self.game.world.centerY,
                                   "play_bg");
    self.bg.anchor.setTo(0.5);
    self.bg.width = self.game.width;
    self.bg.height = self.game.height;

    self.gradient_mask = self.game.add.sprite(self.game.world.centerX,
                                              self.game.world.centerY,
                                              "play_gradient_mask");
    self.gradient_mask.anchor.setTo(0.5);
    self.gradient_mask.width = self.game.width * 2;
    self.gradient_mask.height = self.game.height * 2;
    self.gradient_mask.alpha = 0;

    self.add.tween(self.gradient_mask).to(
    {alpha: 0.3}, 10000, "Quad.easeInOut", true, 0, -1, true);

    self.gradient_mask_2 = self.game.add.sprite(self.game.world.centerX,
                                                self.game.world.centerY,
                                                "play_gradient_mask");
    self.gradient_mask_2.anchor.setTo(0.5);
    self.gradient_mask_2.width = self.game.width * 2;
    self.gradient_mask_2.height = self.game.height * 2;
    self.gradient_mask_2.angle = 180;
    self.gradient_mask_2.alpha = 0;

    self.add.tween(self.gradient_mask_2).to(
    {alpha: 0.3}, 10000, "Quad.easeInOut", true, 6000, -1, true);

    self.glow = self.add.sprite(self.game.world.centerX,
                                     self.game.world.centerY,
                                     "transition");
    self.glow.anchor.setTo(0.5);
    self.glow.width = self.game.width;
    self.glow.height = self.game.height;

    self.glow.alpha = 0.8;
    self.glow.z = 3;

    self.add.tween(self.glow).to(
      {alpha: 0}, 1200, "Quart.easeOut", true);

  },

  update: function() {

  },

  resize: function() {
    var self = this;

    self.bg.x = self.game.world.centerX;
    self.bg.y = self.game.world.centerY;
    self.bg.width = self.game.width;
    self.bg.height = self.game.height;

    self.gradient_mask.x = self.game.world.centerX;
    self.gradient_mask.y = self.game.world.centerY;
    self.gradient_mask.width = self.game.width * 2;
    self.gradient_mask.height = self.game.height * 2;

    self.gradient_mask_2.x = self.game.world.centerX;
    self.gradient_mask_2.y = self.game.world.centerY;
    self.gradient_mask_2.width = self.game.width * 2;
    self.gradient_mask_2.height = self.game.height * 2;

  },
  
};

module.exports = Play;
