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

    this.title.x = this.game.world.centerX;
    this.title.y = this.game.world.centerY;
  }

};

module.exports = Menu;
