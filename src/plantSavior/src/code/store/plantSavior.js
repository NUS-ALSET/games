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
    deseaseRandomPlant(){
        if(Math.random()<0.01){
            var gameId = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            var plantId = Math.floor(Math.random() * ((this.plants[gameId].length-1) - 0 + 1) + 0);
            var newState = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            if(this.plants[gameId][plantId].state == 0)
                this.plants[gameId][plantId].state = newState;
            else{
                this.deseaseRandomPlant();
            }
            if(gameId==0&&this.plants[1][plantId].state==0)
                this.plants[1][plantId].state=newState;
            if(gameId==1&&this.plants[0][plantId].state==0)
                this.plants[0][plantId].state=newState;
        }
    }
    decreaseHealth(){
        for(var i=0;i<this.plants[0].length;i++){
            if(this.plants[0][i].state==1||this.plants[0][i].state==2){
                this.plants[0][i].time--;
                if(this.plants[0][i].time<=0){
                    this.plants[0][i].time=400;
                    this.plants[0][i].life-=20;
                }
                if(this.plants[0][i].life<=0)
                    this.plants[0][i].state=3;
            }
            if(this.plants[1][i].state==1||this.plants[1][i].state==2){
                this.plants[1][i].time--;
                if(this.plants[1][i].time<=0){
                    this.plants[1][i].time=400;
                    this.plants[1][i].life-=20;
                }
                if(this.plants[1][i].life<=0)
                    this.plants[1][i].state=3;
            }
        }
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
        console.log(this.plants[0].length);
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
        this.plants[gameId][colId]={ x: this.plants[gameId][colId].x, y: this.plants[gameId][colId].y, state: 0, life: 95, time: 400 };
    }
    updateCustomCode(newText) {
        this.func = newText;
    }
}
export default new plantSaviorStore();