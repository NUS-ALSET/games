import { observable, computed, extendObservable } from 'mobx';
import twoWinConfig from '../defaultConfig/singlePlayerTwoWindowsConfig.json';

class singlePlayerTwoWindowsStore {
  constructor() {
    extendObservable(this, {
      time: twoWinConfig.time,
      position: [
        twoWinConfig.game1.character.startingPoint,
        twoWinConfig.game2.character.startingPoint
      ],
      direction: ['left', 'up'],
      collectives: [[], []],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false
    });
  }

  moveCharacter(gameId) {
    switch (this.direction[gameId]) {
      case 'up':
        this.position[gameId].y -=
          twoWinConfig['game' + (gameId + 1)]['character'].speed;
        break;
      case 'down':
        this.position[gameId].y +=
          twoWinConfig['game' + (gameId + 1)]['character'].speed;
        break;
      case 'left':
        this.position[gameId].x -=
          twoWinConfig['game' + (gameId + 1)]['character'].speed;
        break;
      case 'right':
        this.position[gameId].x +=
          twoWinConfig['game' + (gameId + 1)]['character'].speed;
        break;
      default:
        break;
    }
  }
  restartCharacter(gameId) {
    this.position[gameId] =
      twoWinConfig['game' + (gameId + 1)]['character'].startingPoint;
    this.direction = ['left', 'up'];
    this.time = twoWinConfig.time;
    this.score = [0, 0];
  }
  changeDirection(gameId, direction) {
    this.direction[gameId] = direction;
  }
  generateCollectives(gameId, min, max, size) {
    if (!document.getElementById('game' + gameId)) return;
    var gameWidth = document.getElementById('game' + gameId).childNodes[0]
      .childNodes[0].offsetWidth;
    var gameHeight = document.getElementById('game' + gameId).childNodes[0]
      .childNodes[0].offsetHeight;
    if (this.collectives[gameId].length > 0) return;
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x =
        Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
      stoneObj.y =
        Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
      stoneObj.size = size;
      this.collectives[0].push(stoneObj);
      this.collectives[1].push(stoneObj);
    }
  }
  removeCollective(gameId, colId) {
    this.collectives[gameId].splice(colId, 1);
    this.score[gameId]++;
  }
  updateCustomCode(newText) {
    this.func = newText;
  }
}
export default new singlePlayerTwoWindowsStore();
