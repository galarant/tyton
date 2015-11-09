import _ from 'lodash';

class TytonDialog {

  constructor(game, phrases, speed=300) {

    this.__phrases = phrases;
    this.speed = speed;

  }

  add(phrase) {
    this.__phrases.push(phrase);
  }

  [Symbol.iterator]() {
    return this.__phrases.values();
  }

}

export { TytonText };
