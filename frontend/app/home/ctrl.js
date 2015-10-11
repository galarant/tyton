import { BootState } from '../states/boot';
import { PreloadState } from '../states/preload';
import { MenuState } from '../states/menu';
import { PlayState } from '../states/play';

function HomeController ($location) {

  var game = new Phaser.Game('100%', '100%', Phaser.AUTO, '');

  //define the game states
  game.state.add("boot", BootState);
  game.state.add("preload", PreloadState);
  game.state.add("menu", MenuState);
  game.state.add("play", PlayState);

  //start the game
  game.state.start("boot");
}

export { HomeController };
