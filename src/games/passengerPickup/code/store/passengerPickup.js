import { observable, computed, extendObservable } from 'mobx';
import squadConfig from '../defaultConfig/passengerPickup.json';

class passengerStore {
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
      funcNeedUpdate: false,
      freePlaces:[[0,0],[0,0]],
      destinationPoint:[[null,null],[null,null]],
      obstacleMap:[new Array(squadConfig.game1.obstacleMap.length), new Array(squadConfig.game1.obstacleMap.length)]
    });
    this.generateMapFromArray(squadConfig.game1.obstacleMap, 0);
    this.generateMapFromArray(squadConfig.game2.obstacleMap, 1);
  }
  generateMapFromArray(arr, gameId){
    var rowQuantity = window.innerHeight*0.8/30<arr.length?window.innerHeight*0.8/30:arr.length;
    var colQuantity = window.innerWidth/2/30<arr[0].length?window.innerWidth/2/30:arr[0].length;
    
    for(var i=0;i<rowQuantity;i++){
      if(this.obstacleMap[gameId][i]===undefined)
        this.obstacleMap[gameId][i] = new Array(arr[i].length);
      for(var j=0;j<colQuantity;j++){
        if(arr[i][j]){
          this.obstacleMap[gameId][i][j] = new Cell(i,j,gameId);
        }
      }
    }
    for(var i=0;i<rowQuantity;i++){
      for(var j=0;j<colQuantity;j++){
        if(this.obstacleMap[gameId][i][j])
          this.obstacleMap[gameId][i][j].addNeighbors(this.obstacleMap[gameId]);
      }
    }
  }
  clearNeighbors(gameId,charId){
    var arr = this.obstacleMap[gameId];
    var rowQuantity = window.innerHeight*0.8/30<arr.length?window.innerHeight*0.8/30:arr.length;
    var colQuantity = window.innerWidth/2/30<arr[0].length?window.innerWidth/2/30:arr[0].length;
    for(var i=0;i<rowQuantity;i++){
      for(var j=0;j<colQuantity;j++){
        if(this.obstacleMap[gameId][i][j])
          this.obstacleMap[gameId][i][j].previous[charId] = undefined;
      }
    }
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
    this.freePlaces = [[0,0],[0,0]];
    this.destinationPoint = [[null,null],[null,null]];
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
    if (this.collectives[gameId].length > 0) return;
      var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = new Passenger(size);
      stoneObj.setRandomPos(this.obstacleMap[gameId]);
      this.collectives[0].push(stoneObj);
      this.collectives[1].push(stoneObj);
    }
    console.log(this.collectives[0]);
  }
  loadOutPassengers(gameId, playerId){
    this.score[gameId]++;
    this.destinationPoint[gameId][playerId]=null;
    this.freePlaces[gameId][playerId]=0;
  }
  removeCollective(gameId, playerId, colId) {
    if(this.freePlaces[gameId][playerId]<1){
      this.destinationPoint[gameId][playerId]=this.collectives[gameId][colId];
      this.collectives[gameId].splice(colId, 1);
      this.freePlaces[gameId][playerId]++;
    }
  }
  updateCustomCode(newText) {
    console.log('updating');
    this.func = newText;
  }
}
class Cell{
  constructor(y,x,gameId) {
    this.x=x;
    this.y=y;
    this.gameId=gameId;
    this.f=0;
    this.g=0;
    this.b=0;
    this.neighbors = [];
    this.previous = [undefined,undefined];
    this.tile=null;
    this.size=30;
  }
  addNeighbors(grid){
		var x = this.x;
    var y = this.y;
    var rows = grid.length;
    var cols = grid[0].length;
    /*if(x==1&&y==0){
      console.log(grid[y][x+1]);
      console.log(grid[y][x-1]);
    }*/
    
		if(grid[y+1]&&grid[y+1][x]){
      this.neighbors.push(grid[y+1][x]);
    }
		if(grid[y-1]&&grid[y-1][x]){
      this.neighbors.push(grid[y-1][x]);
    }
		if(grid[y]&&grid[y][x+1]){
      this.neighbors.push(grid[y][x+1]);
    }
		if(grid[y]&&grid[y][x-1]){
      this.neighbors.push(grid[y][x-1]);
    }
  }
}
class Passenger{
  constructor(size){
    this.x = 0;
    this.y = 0;
    this.takeofX = 0;
    this.takeofY = 0;
    this.size = size;
    this.collective = null;
    this.cell = null;
    this.status = 'looking';
    this.characterId = undefined;
  }
  setRandomPos(arr){
    this.x = Math.floor(Math.random()*(window.innerWidth/2/30-2))*30;
    this.y = Math.floor(Math.random()*(window.innerHeight*0.8/30-2))*30;
    var rowId = Math.floor(this.y/30);
    var colId = Math.floor(this.x/30);
    while(!arr[rowId]||!arr[rowId][colId]){
      this.x = Math.floor(Math.random()*window.innerWidth/2/30-2)*30;
      this.y = Math.floor(Math.random()*window.innerHeight*0.8/30-2)*30;
      rowId = Math.floor(this.y/30);
      colId = Math.floor(this.x/30);
    }


    this.takeofX = Math.floor(Math.random()*(window.innerWidth/2/30-2))*30;
    this.takeofY = Math.floor(Math.random()*(window.innerHeight*0.8/30-2))*30;
    var rowId = Math.floor(this.takeofY/30);
    var colId = Math.floor(this.takeofX/30);
    while(!arr[rowId]||!arr[rowId][colId]){
      this.takeofX = Math.floor(Math.random()*window.innerWidth/2/30-2)*30;
      this.takeofY = Math.floor(Math.random()*window.innerHeight*0.8/30-2)*30;
      rowId = Math.floor(this.takeofY/30);
      colId = Math.floor(this.takeofX/30);
    }
  }
}
export default new passengerStore();