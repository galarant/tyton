function Menu() {}

Menu.prototype = {

  preload: function() {
  },

  create: function() {
    //show the background sprite
    this.background = this.game.add.sprite(this.game.world.centerX,
                                           this.game.world.centerY,
                                           "background");
    this.background.anchor.setTo(0.5);
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.gradient_mask = this.game.add.sprite(this.game.world.centerX,
                                              this.game.world.centerY,
                                              "radial_gradient");
    this.gradient_mask.anchor.setTo(0.75);
    this.gradient_mask.width = this.game.width * 3;
    this.gradient_mask.height = this.game.height * 3;
    this.gradient_mask.alpha = 0.5;

    glow_y = this.add.tween(this.gradient_mask.anchor).to(
      {y: 0.25}, 5000, "Circ", true, 0, -1, true);

    glow_x = this.add.tween(this.gradient_mask.anchor).to(
      {x: 0.25}, 7000, "Circ", true, 0, -1, true);

    //add the title
    this.title = this.game.add.text(this.game.world.centerX,
                                    this.game.world.centerY,
                                    "TYTON");
    this.title.anchor.setTo(0.5);
    this.title.font = "Lucida Console, Monaco, monospace";
    this.title.fontSize = 60;
    this.title.fill = "#FFFFFF";
  },

  update: function() {

  },

  resize: function() {

    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;

    this.gradient_mask.width = this.game.width * 3;
    this.gradient_mask.height = this.game.height * 3;

    this.title.x = this.game.world.centerX;
    this.title.y = this.game.world.centerY;
  }

};

module.exports = Menu;
