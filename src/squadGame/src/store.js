import { observable, extendObservable } from 'mobx';
import config from './simulation/config.json';
import {defaultJavascriptFunctionCode} from './view/Components/defaultCode';

class squadStore {
  constructor() {
      let position = [new Array(config.maxBotsQuantityPerGam),new Array(config.maxBotsQuantityPerGam)];
      for(var i=0;i<8;i++){
          position[0][i] = config.player1StartingPoint;
          position[1][i] = config.player1StartingPoint;
      }
      extendObservable(this, {
          time: config.time,
          prevTime: Date.now(),
          position: position,
          botsQuantity:config.botsQuantityPerGame,
          direction: [['right','down'], ['right','down']],
          collectives1: observable([]),
          collectives2: observable([]),
          score: [0, 0],
          mode: 'play',
          player1Func: undefined,
          player2Func: undefined,
          func: defaultJavascriptFunctionCode,
          needToRestartGame: false,
          editorMode: config.editorMode,
            editorPyCode: '',
            currentLevel: 1,
            showGameSimulation: false,
            tournamentScoreBeaten: false
      });
      this.data = {};
  }
  updatePosition(gameId, playerId, newPosition, offset){
      if(Math.abs(this.position[gameId][playerId].x - newPosition.x) >= offset || Math.abs(this.position[gameId][playerId].y - newPosition.y) >= offset){
          this.position[gameId][playerId] = newPosition;
      }
  }
  updateCollectives(gameId, collectivesArr){
    var collectives;
      if(gameId===0)
          collectives = this.collectives1;
      else
          collectives = this.collectives2;
      if(collectives.length !== collectivesArr.length){
          if(gameId===0)
              this.collectives1 = collectivesArr;
          else
              this.collectives2 = collectivesArr;
      }
  }
  updateDirection(gameId, playerId, newDirection){
    var direction = 'right';
      if(newDirection.right)
          direction = 'right';
      else if(newDirection.left)
          direction = 'left';
      else if(newDirection.up)
          direction = 'up';
      else if(newDirection.down)
          direction = 'down';
      if(this.direction[gameId][playerId]!==direction){
          this.direction[gameId][playerId]=direction;
      }
  }
  updateScore(gameId, score){
      if(this.score[gameId]!==score){
          
          this.score[gameId]=score;
      }
  }
}

export default new squadStore();