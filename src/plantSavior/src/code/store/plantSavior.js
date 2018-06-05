import { observable, computed, extendObservable } from 'mobx';
import plantSaviorConfig from '../defaultConfig/plantSaviorConfig.json';

class plantSaviorStore {
    constructor() {
        extendObservable(this, {
            time: plantSaviorConfig.time,
            position: [
                [
                    plantSaviorConfig.game1.character1.startingPoint,
                    plantSaviorConfig.game1.character2.startingPoint
                ],
                [
                    plantSaviorConfig.game2.character1.startingPoint,
                    plantSaviorConfig.game2.character2.startingPoint
                ]
            ],
            direction: [['left', 'up'], ['left', 'up']],
            filled: [[0,0],[0,0]],
            currentControllable: [1, 1],
            plants: [[], []],
            timeStampData: Date.now(),
            healthyPlants: [0, 0],
            alivePlants: [0, 0],
            mode: 'play',
            func: false,
            funcNeedUpdate: false
        });
    }
    moveCharacter(gameId, characterId) {
        switch (this.direction[gameId][characterId]) {
            case 'up':
                this.position[gameId][characterId].y -=
                plantSaviorConfig['game' + (gameId + 1)][
                    'character' + (characterId + 1)
                ].speed;
                break;
            case 'down':
                this.position[gameId][characterId].y +=
                plantSaviorConfig['game' + (gameId + 1)][
                    'character' + (characterId + 1)
                ].speed;
                break;
            case 'left':
                this.position[gameId][characterId].x -=
                plantSaviorConfig['game' + (gameId + 1)][
                    'character' + (characterId + 1)
                ].speed;
                break;
            case 'right':
                this.position[gameId][characterId].x +=
                plantSaviorConfig['game' + (gameId + 1)][
                    'character' + (characterId + 1)
                ].speed;
                break;
            default:
                break;
        }
    }
    restartCharacter(gameId, charId) {
        this.position[gameId][charId] =
        plantSaviorConfig['game' + (gameId + 1)][
            'character' + (charId + 1)
        ].startingPoint;
        this.direction[gameId] = ['left', 'up'];
        this.time = plantSaviorConfig.time;
        this.plants[0].forEach(plant => {
            plant.state = 0;
            plant.life = 95;
        });
        this.plants[1].forEach(plant => {
            plant.state = 0;
            plant.life = 95;
        });
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
    deseaseRandomPlant(){
        if(Math.random()<0.01){
            var gameId = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            var plantId = Math.floor(Math.random() * ((this.plants[gameId].length-1) - 0 + 1) + 0);
            var newState = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            if(this.plants[gameId][plantId].state == 0){
                this.plants[gameId][plantId].state = newState;
            }
            else{
                this.deseaseRandomPlant();
            }
            if(gameId==0&&this.plants[1][plantId].state==0){
                this.plants[1][plantId].state=newState;
            }
            if(gameId==1&&this.plants[0][plantId].state==0){
                this.plants[0][plantId].state=newState;
            }
        }
    }
    decreaseHealth(){
        var healthy = [this.plants[0].length, this.plants[1].length];
        var alive = [this.plants[0].length, this.plants[1].length];
        for(var i=0;i<this.plants[0].length;i++){
            if(this.plants[0][i].state==1||this.plants[0][i].state==2){
                healthy[0]--;
                this.plants[0][i].time--;
                if(this.plants[0][i].time<=0){
                    this.plants[0][i].time=400;
                    this.plants[0][i].life-=20;
                }
                if(this.plants[0][i].life<=0){
                    this.plants[0][i].state=3;
                }
            }
            if(this.plants[1][i].state==1||this.plants[1][i].state==2){
                healthy[1]--;
                this.plants[1][i].time--;
                if(this.plants[1][i].time<=0){
                    this.plants[1][i].time=400;
                    this.plants[1][i].life-=20;
                }
                if(this.plants[1][i].life<=0){
                    this.plants[1][i].state=3;
                }
            }
            if(this.plants[0][i].state==3){
                healthy[0]--;
                alive[0]--;
            }
            if(this.plants[1][i].state==3){
                healthy[1]--;
                alive[1]--;
            }
        }
        if(this.healthyPlants[0]!==healthy[0])
            this.healthyPlants[0]=healthy[0];
        if(this.healthyPlants[1]!==healthy[1])
            this.healthyPlants[1]=healthy[1];
        if(this.alivePlants[0]!==alive[0])
            this.alivePlants[0]=alive[0];
        if(this.alivePlants[1]!==alive[1])
            this.alivePlants[1]=alive[1];
    }
    generatePlants(gameId) {
        if(this.plants[gameId].length>0){
            this.decreaseHealth();
            this.deseaseRandomPlant();
            return;
        }
        var max = plantSaviorConfig.game1.plants.max;
        var min = plantSaviorConfig.game1.plants.min;
        var size = plantSaviorConfig.game1.plants.size;
        if (!document.getElementById('game' + gameId)) return;
        var gameWidth = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetWidth;
        var gameHeight = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetHeight;
        var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
        for (var i = 0; i < stonesQuant; i++) {
            var stoneObj = { x: 0, y: 0, state: 0, life: 95, time: 400 };
            stoneObj.x =
                Math.floor(Math.random() * (gameWidth / size - 0 - 1) + 0) * size;
            stoneObj.y =
                Math.floor(Math.random() * (gameHeight / size - 2) + 2) * size;
            stoneObj.size = size;
            if(!this.findPlantWithSamePosition(stoneObj)){
                this.plants[0].push(stoneObj);
                this.plants[1].push(stoneObj);
            }
        }
        this.healthyPlants[0] = this.plants[0].length;
        this.healthyPlants[1] = this.plants[0].length;
        this.alivePlants[0] = this.plants[0].length;
        this.alivePlants[1] = this.plants[0].length;
    }
    findPlantWithSamePosition(plant){
        var isClone = false;
        for (var i = 0; i < this.plants[0].length; i++) {
            if(this.plants[0][i].x == plant.x&&this.plants[0][i].y == plant.y)
                isClone = true;
        }
        return isClone;
    }
    curePlant(gameId, colId, charId) {
        if(
            this.filled[gameId][charId]==1&&this.plants[gameId][colId].state==2||
            this.filled[gameId][charId]==2&&this.plants[gameId][colId].state==1
        ){
            this.plants[gameId][colId]={ x: this.plants[gameId][colId].x, y: this.plants[gameId][colId].y, state: 0, life: 95, time: 400 };
            this.filled[gameId][charId]=0;
        }
    }
    updateCustomCode(newText) {
        this.func = newText;
    }
}
export default new plantSaviorStore();