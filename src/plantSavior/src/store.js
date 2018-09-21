import { observable, computed, extendObservable, autorun } from 'mobx';
import config from './simulation/config.json';
import {defaultJavascriptFunctionCode} from './view/Components/defaultCode';

class squadStore {
    constructor() {
        let position = [new Array(8),new Array(8)];
        let filled = [new Array(8),new Array(8)];
        for(var i=0;i<8;i++){
            position[0][i] = config.player1StartingPoint;
            position[1][i] = config.player1StartingPoint;
            filled[0][i] = 0;
            filled[1][i] = 0;
        }
        extendObservable(this, {
            time: config.time,
            prevTime: Date.now(),
            position:position,
            botsQuantity:config.botsQuantityPerGame,
            filled:filled,
            direction: [['right','down'], ['right','down']],
            plants1: [],
            plants2: [],
            score: [0, 0],
            mode: 'play',
            player1Func: undefined,
            player2Func: undefined,
            func: defaultJavascriptFunctionCode,
            needToRestartGame: false,
            player1ControlSelected: "level3",
            player2ControlSelected:"manual control"
        });
    }
    updatePosition(gameId, playerId, newPosition, offset){
        if(Math.abs(this.position[gameId][playerId].x - newPosition.x) >= offset || Math.abs(this.position[gameId][playerId].y - newPosition.y) >= offset){
            this.position[gameId][playerId] = newPosition;
        }
    }
    updatePlants(gameId, plantsArr){
        var needToUpdate = false;
        if(this['plants'+(gameId+1)].length !== plantsArr.length){
            if(gameId==0)
                this.plants1 = plantsArr;
            else
                this.plants2 = plantsArr;
        }
        if(gameId==0)
            var plants = this.plants1;
        else
            var plants = this.plants2;
        plants.forEach((plant,plantIndex) => {
            if(plant.state!==plantsArr[plantIndex].state)
                needToUpdate = true;
            else if(plant.health-plantsArr[plantIndex].health>10)
                needToUpdate = true;
        });
        if(needToUpdate)
            if(gameId==0)
                this.plants1 = plantsArr;
            else
                this.plants2 = plantsArr;
    }
    updateDirection(gameId, playerId, newDirection){
        if(newDirection.right)
            var direction = 'right';
        else if(newDirection.left)
            var direction = 'left';
        else if(newDirection.up)
            var direction = 'up';
        else if(newDirection.down)
            var direction = 'down';

        if(this.direction[gameId][playerId]!=direction){
            this.direction[gameId][playerId]=direction;
        }
    }
    updateScore(gameId, score){
        if(this.score[gameId]!==score){
            
            this.score[gameId]=score;
        }
    }
    updateFilling(gameId, playerId, newState){
        if(this.filled[gameId][playerId]!==newState){
            this.filled[gameId][playerId]=newState;
        }
    }
}

export default new squadStore();