function Menu() {}

Menu.prototype = {

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

    self.gradient_mask = self.game.add.sprite(self.game.world.centerX,
                                              self.game.world.centerY,
                                              "color_gradient");
    self.gradient_mask.anchor.setTo(0.75);
    self.gradient_mask.width = self.game.width * 4;
    self.gradient_mask.height = self.game.height * 4;
    self.gradient_mask.alpha = 0.5;

    self.add.tween(self.gradient_mask.anchor).to(
      {y: 0.25}, 10000, "Quad.easeOut", true, 0, -1, true);

    self.add.tween(self.gradient_mask.anchor).to(
      {x: 0.25}, 15000, "Quad.easeOut", true, 0, -1, true);

    self.add.tween(self.gradient_mask).to(
      {angle: 360}, 20000, "Linear", true, 0, -1, false);

    //add the title
    self.title = self.game.add.bitmapText(self.game.world.centerX,
                                          self.game.world.centerY,
                                          "glametrix",
                                          "TYTON",
                                          150);
    self.title.anchor.setTo(0.5);

    //animate the title letters
    self.letter_tween_delay = 300;
    _(self.title.children).forEach(function(letter) {
      letter.alpha = 0;
      self.game.add.tween(letter).to(
        {alpha: 1}, 2500, "Quad.easeInOut", true, self.letter_tween_delay);
      self.letter_tween_delay += 300;
    }).value();

    self.input.onDown.add(this.menuClick, this);
  },

  update: function() {

  },

  resize: function() {

    self = this;

    self.background.width = self.game.width;
    self.background.height = self.game.height;
    self.background.x = self.game.world.centerX;
    self.background.y = self.game.world.centerY;

    self.gradient_mask.width = self.game.width * 4;
    self.gradient_mask.height = self.game.height * 4;

    self.title.x = self.game.world.centerX;
    self.title.y = self.game.world.centerY;
  },

  menuClick: function() {
    this.glow = this.game.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "transition");
    this.glow.anchor.setTo(0.5);
    this.glow.width = this.game.width;
    this.glow.height = this.game.height;

    this.glow.alpha = 0;

    transition_tween = this.game.add.tween(this.glow).to(
      {alpha: 0.8}, 1200, "Quart.easeIn");
    transition_tween.onComplete.add(this.moveToPlay, this);
    transition_tween.start();
  },

  moveToPlay: function() {
    this.game.state.start("play");
  }

};

module.exports = Menu;
