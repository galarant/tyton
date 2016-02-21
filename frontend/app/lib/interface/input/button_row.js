import _ from "lodash";

class ButtonRow extends Phaser.Group {

  constructor(game, buttons, x=0, y=0) {

    super(game, game.world);

    this.x = x;
    this.y = y;

    let buttonX = 0;
    let buttonSpacing = buttons[0].width / 8;
    _.forEach(buttons, function(button) {
      button.x = buttonX;
      buttonX += (button.width + buttonSpacing);
      this.add(button);
    }, this);

  }

}

export { ButtonRow };
