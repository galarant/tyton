var BootState = require("../states/boot");
var PreloadState = require("../states/preload");
var MenuState = require("../states/menu");

function HomeController ($location) {

  var game = new Phaser.Game('100%', '100%', Phaser.AUTO, '');

  //define the game states
  game.state.add("boot", BootState);
  game.state.add("preload", PreloadState);
  game.state.add("menu", MenuState);

  //start the game
  game.state.start("boot");
}

angular.module("tyton").controller("HomeController", [
  HomeController
]);
