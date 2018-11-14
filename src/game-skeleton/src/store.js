import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED } from './constants'

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
      coins: [],
      scores : config.defaultScore
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

  createNewCoins(gameWidth, gameHeight, coinSize) {
    const isOverlap = ({x, y})=>{
      return Boolean(this.coins.find(coin=>
        coin.x >= (x - coinSize) &&
        coin.x <= (x + coinSize) &&
        coin.y >= (y - coinSize) &&
        coin.y <= (y + coinSize) ))
    }
    if (this.coins.length <= config.minCoins) {
      const numOfNewCoins = config.maxCoins - this.coins.length;
      for (let i = 0; i < numOfNewCoins; i++) {
        const coinPosition = {
          x: Math.floor(Math.random() * (gameWidth - coinSize) + coinSize),
          y: Math.floor(Math.random() * (gameHeight - coinSize) + coinSize),
          id: i
        };
        if(isOverlap(coinPosition)){
          i--;
        }else{
          this.coins.push(coinPosition);
        }
      }
    }
  }

}

export default new passengerStore();