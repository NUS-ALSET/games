import { observable, computed, extendObservable } from 'mobx';
import config from './simulation/config.json';
import {defaultJavascriptFunctionCode} from './view/Components/defaultCode';

class squadStore {
    constructor() {
        extendObservable(this, {
            time: config.time,
            prevTime: Date.now(),
            position: [
                config.player1StartingPoint,
                config.player1StartingPoint
            ],
            direction: ['right','right'],
            collectives: [[], []],
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
    updatePosition(gameId, newPosition, offset){
        if(Math.abs(this.position[gameId].x - newPosition.x) >= offset || Math.abs(this.position[gameId].y - newPosition.y) >= offset){
            this.position[gameId] = newPosition;
        }
    }
    updateCollectives(gameId, collectivesArr){
        if(this.collectives[gameId].length !== collectivesArr.length){
            this.collectives[gameId] = collectivesArr;
        }
    }
    updateDirection(gameId, newDirection){
        if(newDirection.right)
            var direction = 'right';
        else if(newDirection.left)
            var direction = 'left';
        else if(newDirection.up)
            var direction = 'up';
        else if(newDirection.down)
            var direction = 'down';

        if(this.direction[gameId]!=direction){
            this.direction[gameId]=direction;
        }
    }
    updateScore(gameId, score){
        if(this.score[gameId]!==score){
            
            this.score[gameId]=score;
        }
    }
}

export default new squadStore();