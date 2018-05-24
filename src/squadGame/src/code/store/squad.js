import { observable, computed, extendObservable } from 'mobx';
import squadConfig from '../defaultConfig/squadConfig.json';

class squadStore {
  constructor() {
    extendObservable(this, {
      time: squadConfig.time,
      position: [
        [
          squadConfig.game1.character1.startingPoint,
          squadConfig.game1.character2.startingPoint
        ],
        [
          squadConfig.game2.character1.startingPoint,
          squadConfig.game2.character2.startingPoint
        ]
      ],
      direction: [['left', 'up'], ['left', 'up']],
      currentControllable: [1, 1],
      collectives: [[], []],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false
    });
  }
  moveCharacter(gameId, characterId) {
    switch (this.direction[gameId][characterId]) {
      case 'up':
        this.position[gameId][characterId].y -=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'down':
        this.position[gameId][characterId].y +=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'left':
        this.position[gameId][characterId].x -=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'right':
        this.position[gameId][characterId].x +=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      default:
        break;
    }
  }
  restartCharacter(gameId, charId) {
    this.position[gameId][charId] =
      squadConfig['game' + (gameId + 1)][
        'character' + (charId + 1)
      ].startingPoint;
    this.direction[gameId] = ['left', 'up'];
    this.time = squadConfig.time;
    this.score = [0, 0];
  }
  changeDirection(gameId, characterId, direction) {
    this.direction[gameId][characterId] = direction;
  }
  switchPlayer(gameId) {
    if (Date.now() - this.timestamp < 1000) return;
    if (this.currentControllable[gameId] == 0)
      this.currentControllable[gameId] = 1;
    else this.currentControllable[gameId] = 0;
    this.timestamp = Date.now();
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
export default new squadStore();
