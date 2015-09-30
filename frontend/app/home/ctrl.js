var BootState = require("../states/boot");
var PreloadState = require("../states/preload");
var MenuState = require("../states/menu");

function HomeController ($location) {

  // get dimensions of the window considering retina displays
  var w = window.innerWidth * window.devicePixelRatio;
  var h = window.innerHeight * window.devicePixelRatio;

  var game = new Phaser.Game((h > w) ? h : w, (h > w) ? w : h, Phaser.AUTO, "tyton_canvas");

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
