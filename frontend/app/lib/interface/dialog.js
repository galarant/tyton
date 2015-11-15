import { Phrase } from './phrase';

class Dialog {

  constructor(game, strings=[], font_size=150, frames=200) {
    this.strings = strings;
    this.font_size = font_size;
    this.frames = frames;
    this.game = game;
    this.current_phrase = null;
  }

  next() {
    if (this.current_phrase !== null) {
      this.current_phrase.destroy();
    }
    if (this.strings.length > 0) {
      let next_string = this.strings.shift();
      this.current_phrase = new Phrase(this.game, next_string, this.font_size, this.frames);
      this.current_phrase.show();
      return this.current_phrase;
    }
    else {
      return null;
    }
  }

}

export { Dialog };
