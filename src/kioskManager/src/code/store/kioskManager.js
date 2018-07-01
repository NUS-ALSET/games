import { observable, computed, extendObservable } from 'mobx';
import koiskManagerConfig from '../defaultConfig/koiskManagerConfig.json';

class kioskManagerStore {
    constructor(){
        extendObservable(this, {
            time: plantSaviorConfig.time,
            position: [
                [
                    koiskManagerConfig.game1.fixer.startingPoint,
                    koiskManagerConfig.game1.helper.startingPoint
                ],
                [
                    koiskManagerConfig.game2.fixer.startingPoint,
                    koiskManagerConfig.game2.helper.startingPoint
                ]
            ],
            direction: [['left', 'up'], ['left', 'up']],
            helpers: [[],[]],
            score: [0,0],
            currentControllable: [1, 1],
            kiosk: [[], []],
            people: [[], []],
            mode: 'play',
            func: false,
            funcNeedUpdate: false
        });
    }
    generateKoisks(){
        if(this.kiosk[0].length>0){
            return;
        }
        if (!document.getElementById('game0')) return;
        var max = koiskManagerConfig.game1.kiosks.max;
        var min = koiskManagerConfig.game1.kiosks.min;
        var size = koiskManagerConfig.game1.kiosks.size;
        var gameWidth = document.getElementById('game0').childNodes[0]
        .childNodes[0].offsetWidth;
        var gameHeight = document.getElementById('game0').childNodes[0]
        .childNodes[0].offsetHeight;
        var kioskQuant = Math.floor(Math.random() * (max - min + 1) + min);
        var kioskDistance = gameWidth/kioskQuant;
        for (var i = 0; i < kioskQuant; i++) {
            var kioskObj = { x: i*kioskDistance+10, y: gameHeight-10-koiskManagerConfig.size + 10*koiskManagerConfig.lineSize, state: 0, life: 95, time: 400, line: [] };
            this.kiosk[0].push(kioskObj);
            this.kiosk[1].push(kioskObj);
        }
    }
    genereatePeople(){
        if(this.people[0].length>0){
            return;
        }
        if (!document.getElementById('game0')) return;
        var max = koiskManagerConfig.game1.peoples.max;
        var min = koiskManagerConfig.game1.peoples.min;
        var size = koiskManagerConfig.game1.peoples.size;
        var gameWidth = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetWidth;
        var gameHeight = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetHeight;
        var peopleQuant = Math.floor(Math.random() * (max - min + 1) + min);
        for (var i = 0; i < peopleQuant; i++) {
            var peopleObj = { x: 0, y: 0, direction: 'down', updateTime:900, kiosk:null, isInLine:false, numInLine:null, timeToGetFood:2000, helper:null, state:1 };
            peopleObj.x = Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
            peopleObj.y = Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
        }
    }
    breakRandomKiosk(){
        if(Math.random<0.01){
            var gameId = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            var kioskId = Math.floor(Math.random() * ((this.kiosk[gameId].length-1) - 0 + 1) + 0);
            if(this.kiosk[0][kioskId].state==0){
                this.kiosk[0][kioskId].state=1;
                this.kiosk[0][kioskId].life=0;
            }
            if(this.kiosk[1][kioskId].state==0){
                this.kiosk[1][kioskId].state=1;
                this.kiosk[1][kioskId].life=0;
            }
        }
    }
    fixKiosk(gameId, kioskId){
        if(this.kiosk[gameId][kioskId].updateTime>0){
            this.kiosk[gameId][kioskId].time --;
        }
        else{
            this.kiosk[gameId][kioskId].time = 900;
            this.kiosk[0][kioskId].life+=10;
        }
        if(this.kiosk[0][kioskId].life>=95){
            this.kiosk[0][kioskId].life=95;
            this.kiosk[gameId][kioskId].time = 900;
        }
        this.kiosk[0][kioskId].state = 1;
    }
    moveTowardKiosk(guy, kiosk){
        var speed = koiskManagerConfig.game1.peoples.speed;
        var kioskX = kiosk.x;
        var kioskY = kiosk.y + kiosk.line.length*20;
        if(guy.x==kioskX&&guy.y==kioskY&&kiosk.line.indexOf(guy)===-1){
            kiosk.line.push(guy);
            guy.numInLine = kiosk.line.indexOf(guy);
        }
        else if(guy.y<kioskY)
            guy.y+=speed;
        else if(guy.y>kioskY)
            guy.y-=speed;
        else if(guy.x<kioskX)
            guy.x+=speed;
        else if(guy.x>kioskX)
            guy.x-=speed;
    }
    breakLineToKiosk(gameId, guyId, kioskId){
        var lineLength = this.kiosk[gameId][kioskId].line.length;
        var leavingLinePeopleArr = this.kiosk[gameId][kioskId].line.splice(kioskId, lineLength);
        for(var i=0;i<leavingLinePeopleArr.length;i++){
            leavingLinePeopleArr[i].kiosk = null;
            leavingLinePeopleArr[i].timeToGetFood=2000;
            leavingLinePeopleArr[i].helper = true;
        }
        this.helpers[gameId]=leavingLinePeopleArr;
    }
    addLineToKiosk(gameId, guyId, kioskId){
        var lineLength = this.helpers[gameId].length;
        for(var i=0;i<this.helper[0].length;i++){
            this.helper[0][i].kiosk = kioskId;
            this.helper[0][i].helper = null;
        }
        this.helpers[gameId]=[];
    }
    moveTowardHelper(){
        var speed = koiskManagerConfig.game1.peoples.speed;
        for(var i=0;i<this.helper[0].length;i++){
            var posX = this.position[0][1].x;
            var posY = this.position[0][1].y+i*20;
            if(this.helper[0][i].y<posY)
                this.helper[0][i].y+=speed;
            else if(this.helper[0][i].y>posY)
                this.helper[0][i].y-=speed;
            if(this.helper[0][i].x<posX)
                this.helper[0][i].x+=speed;
            else if(this.helper[0][i].x>posX)
                this.helper[0][i].x-=speed;
        }
    }
    managePeople(){
        for (var i = 0; i < this.people[0].length; i++) {
            if(this.people[0][i].kiosk == null&&this.people[0][i].helper == null&&Math.random<0.1){
                var kioskId = Math.floor(Math.random() * ((this.kiosk[0].length-1) - 0 + 1) + 0);
                if(this.kiosk[0][kioskId].state==0){
                    this.people[0][i].kiosk = kioskId;
                    if(this.people[1][i].kiosk==null&&this.kiosk[1][kioskId].state==0)
                        this.people[1][i].kiosk=kioskId;
                }
            }else if(this.people[0][i].kiosk == null&&this.people[0][i].helper == null){
                if(this.people[0][i].updateTime>0)
                    this.people[0][i].updateTime--;
                else if(this.people[0][i].updateTime<=0){
                    var directions = ['left', 'right', 'top', 'bottom'];
                    this.people[0][i].updateTime=900;
                    this.people[0][i].direction = directions[Math.floor(Math.random()*directions.length)];
                    if(this.people[1][i].kiosk==null){
                        this.people[1][i].updateTime=900;
                        this.people[1][i].direction = this.people[0][i].direction;
                    }
                }
            }
            if(this.people[0][i].kiosk!==null&&this.people[0][i].numInLine===null){
                this.moveTowardKiosk(this.people[0][i], this.kiosk[0][this.people[0][i].kiosk]);
            }
            else if(this.people[0][i].kiosk!==null&&this.people[0][i].numInLine!==null){
                this.moveTowardKiosk(this.people[0][i], this.kiosk[0][this.people[0][i].kiosk]);
                if(this.people[0][i].numInLine==0&&this.people[0][i].timeToGetFood>0&&this.kiosk[0][this.people[0][i].kiosk].state == 0){
                    this.people[0][i].timeToGetFood--;
                }
                else if(this.people[0][i].numInLine==0&&this.people[0][i].timeToGetFood<=0){
                    this.kiosk[this.people[0][i].kiosk].line.shift();
                    this.people[0][i].timeToGetFood=2000;
                    this.score[0]++;
                    this.people[0][i].kiosk=null;
                    this.people[0][i].numInLine=null;
                }
            }
            if(this.people[1][i].kiosk == null&&this.people[1][i].helper == null&&Math.random<0.1){
                var kioskId = Math.floor(Math.random() * ((this.kiosk[1].length-1) - 0 + 1) + 0);
                if(this.kiosk[1][kioskId].state==0){
                    this.people[1][i].kiosk = kioskId;
                    if(this.people[0][i].kiosk==null&&this.kiosk[0][kioskId].state==0)
                        this.people[0][i].kiosk=kioskId;
                }
            }
            else if(this.people[1][i].kiosk == null&&this.people[0][i].helper == null){
                if(this.people[1][i].updateTime>0)
                    this.people[1][i].updateTime--;
                else if(this.people[1][i].updateTime<=0){
                    var directions = ['left', 'right', 'top', 'bottom'];
                    this.people[1][i].updateTime=900;
                    this.people[1][i].direction = directions[Math.floor(Math.random()*directions.length)];
                    if(this.people[0][i].kiosk==null){
                        this.people[0][i].updateTime=900;
                        this.people[0][i].direction = this.people[1][i].direction;
                    }
                }
            }
            if(this.people[1][i].kiosk!==null&&this.people[1][i].numInLine===null){
                this.moveTowardKiosk(this.people[1][i], this.kiosk[1][this.people[1][i].kiosk]);
            }
            else if(this.people[1][i].kiosk!==null&&this.people[1][i].numInLine!==null){
                this.moveTowardKiosk(this.people[1][i], this.kiosk[1][this.people[1][i].kiosk]);
                if(this.people[1][i].numInLine==0&&this.people[1][i].timeToGetFood>0){
                    this.people[1][i].timeToGetFood--;
                }
                else if(this.people[1][i].numInLine==0&&this.people[1][i].timeToGetFood<=0&&this.kiosk[1][this.people[1][i].kiosk].state == 0){
                    this.kiosk[this.people[1][i].kiosk].line.shift();
                    this.people[1][i].timeToGetFood=2000;
                    this.score[1]++;
                    this.people[1][i].kiosk=null;
                    this.people[1][i].numInLine=null;
                }
            }
        }
    }

}
export default new kioskManagerStore();