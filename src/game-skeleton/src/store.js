import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED} from './constants'

class passengerStore {
  constructor() {
    let position = [config.player1StartingPoint];
    extendObservable(this, {
      time: config.time,
      prevTime: Date.now(),
      position: position,
      direction: 'up',
      score: [0, 0],
      mode: NOT_STARTED,
    });
  }
  updatePosition(gameId, newPosition, offset) {
    if (Math.abs(this.position[gameId].x - newPosition.x) >= offset || Math.abs(this.position[gameId].y - newPosition.y) >= offset) {
      this.position[gameId] = newPosition;
    }
  }
  resetGame() {
    this.updatePosition(0,{x:0,y:0}, 0);
    this.direction = [['right', 'down'], ['right', 'down']];
  }
  updateDirection(newDirection) {
    this.direction = newDirection;
  }
  updateScore(gameId, score) {
    if (this.score[gameId] !== score) {

      this.score[gameId] = score;
    }
  }
  updateMode(mode) {
    this.mode = mode;
  }
}

export default new passengerStore();