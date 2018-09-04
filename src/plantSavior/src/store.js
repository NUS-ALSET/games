import { observable, computed, extendObservable } from 'mobx';
import config from './simulation/config.json';
import {defaultJavascriptFunctionCode} from './view/Components/defaultCode';

class squadStore {
    constructor() {
        extendObservable(this, {
            time: config.time,
            prevTime: Date.now(),
            position: [
                [
                    config.player1StartingPoint,
                    config.player2StartingPoint
                ],
                [
                    config.player1StartingPoint,
                    config.player2StartingPoint
                ]
            ],
            direction: [['right','down'], ['right','down']],
            plants: [[], []],
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
        if(this.plants[gameId].length !== plantsArr.length){
            this.plants[gameId] = plantsArr;
        }
        var needToUpdate = false;
        this.plants[gameId].forEach((plant,plantIndex) => {
            if(plant.state!==plantsArr[plantIndex].state||plant.health!=plantsArr[plantIndex].health)
                needToUpdate = true;
        });
        if(needToUpdate)
            this.plants[gameId] = plantsArr;
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
}

export default new squadStore();