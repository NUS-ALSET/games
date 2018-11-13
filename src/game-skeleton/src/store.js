import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED } from './constants'

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
      coins: [],
      scores :[0]
    });
  }
  updatePosition(gameId, newPosition, offset) {
    if (Math.abs(this.position[gameId].x - newPosition.x) >= offset || Math.abs(this.position[gameId].y - newPosition.y) >= offset) {
      this.position[gameId] = newPosition;
    }
  }
  resetGame() {
    this.updatePosition(0, { x: 0, y: 0 }, 0);
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
          y: Math.floor(Math.random() * (gameHeight - coinSize) + coinSize)
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