import { BootState } from 'states/boot';
import { PreloadState } from 'states/preload';
import { MenuState } from 'states/menu';
import { PlayState } from 'states/play';

class TytonGame extends Phaser.Game {

  constructor() {
    super('100%', '100%', Phaser.AUTO, '');
    this.state.add('boot', BootState);
    this.state.add('preload', PreloadState);
    this.state.add('menu', MenuState);
    this.state.add('play', PlayState);
    this.state.start('boot');
  }

}

export { TytonGame };
