import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED} from './constants'

class passengerStore {
  constructor() {
    let position = config.playersStartingPoint;
    extendObservable(this, {
      time: config.time,
      prevTime: Date.now(),
      position: position,
      direction: config.defaultDirections,
      score: [0, 0],
      mode: NOT_STARTED,
    });
  }
  updatePosition(playerId, newPosition, offset) {
    this.position[playerId] = newPosition;
  }
  resetGame() {
    this.position = config.playersStartingPoint;
    this.direction = config.defaultDirections
  }
  updateDirection(playerId, newDirection) {
    this.direction[playerId] = newDirection;
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