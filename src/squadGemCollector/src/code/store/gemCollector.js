import { observable, computed, extendObservable } from 'mobx';
import gemCollectorConfig from '../defaultConfig/gemCollectorConfig.json';

class gemCollectorStore {
  constructor() {
    extendObservable(this, {
      time: gemCollectorConfig.time,
      position: [
        gemCollectorConfig.game.character1.startingPoint,
        gemCollectorConfig.game.character2.startingPoint
      ],
      direction: ['left', 'up'],
      collectives: [],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false
    });
  }
  moveCharacter(characterId) {
    switch (this.direction[characterId]) {
      case 'up':
        this.position[characterId].y -=
          gemCollectorConfig['game']['character' + (characterId + 1)].speed;
        break;
      case 'down':
        this.position[characterId].y +=
          gemCollectorConfig['game']['character' + (characterId + 1)].speed;
        break;
      case 'left':
        this.position[characterId].x -=
          gemCollectorConfig['game']['character' + (characterId + 1)].speed;
        break;
      case 'right':
        this.position[characterId].x +=
          gemCollectorConfig['game']['character' + (characterId + 1)].speed;
        break;
      default:
        break;
    }
  }
  restartCharacter(charId) {
    this.position[charId] =
      gemCollectorConfig['game']['character' + (charId + 1)].startingPoint;
    this.direction = ['left', 'up'];
    this.time = gemCollectorConfig.time;
    this.score = [0, 0];
  }
  changeDirection(characterId, direction) {
    this.direction[characterId] = direction;
  }
  generateCollectives(min, max, size) {
    if (!document.getElementById('game0')) return;
    var gameWidth = document.getElementById('game0').childNodes[0].childNodes[0]
      .offsetWidth;
    var gameHeight = document.getElementById('game0').childNodes[0]
      .childNodes[0].offsetHeight;
    if (this.collectives.length > 0) return;
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x =
        Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
      stoneObj.y =
        Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
      stoneObj.size = size;
      this.collectives.push(stoneObj);
    }
  }
  removeCollective(charId, colId) {
    this.collectives.splice(colId, 1);
    this.score[charId]++;
  }
  updateCustomCode(newText) {
    this.func = newText;
  }
}
export default new gemCollectorStore();
