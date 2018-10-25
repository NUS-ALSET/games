function Simulation(config, bot1clb, bot2clb, botsQuantity){
    this.config = config;
    this.bot1clb = bot1clb;
    this.bot2clb = bot2clb;
    this.quantity = botsQuantity;
    this.kiosks = [[],[]];
    this.peoples = [[],[]];
    this.generateKiosks();
    this.generatePeople();
    this.repairBot = [new Array(Math.floor(botsQuantity/2)), new Array(Math.floor(botsQuantity/2))];
    this.helperBot = [new Array(Math.ceil(botsQuantity/2)), new Array(Math.ceil(botsQuantity/2))];
}
Simulation.prototype.getDirections = function(direction){
    var botsQuant = this.quantity;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            if(typeof direction[gameId][botId] === 'string'){
                switch(direction[gameId][botId].toUpperCase()){
                    case 'LEFT':
                        direction[gameId][botId] = {left:true};
                        break;
                    case 'RIGHT':
                        direction[gameId][botId] = {right:true};
                        break;
                    case 'UP':
                        direction[gameId][botId] = {up:true};
                        break;
                    case 'DOWN':
                        direction[gameId][botId] = {down:true};
                        break;
                }
            }
        }
    }
    return direction;
}
Simulation.prototype.simulate = function(){

}
Simulation.prototype.moveBots = function(){

}
Simulation.prototype.movePeople = function(){

}
Simulation.prototype.helperBotPersonContacting = function(){

}
Simulation.prototype.helperBotKioskContacting = function(){

}
Simulation.prototype.repairBotKioskRepairing = function(){
    
}
Simulation.prototype.generateKiosks = function(){
    if(this.kiosks[0].length > 0&&this.kiosks[1].length > 0)
        return;
    var max = this.config.maxKiosks;
    var min = this.config.minKiosks;
    var gameWidth = this.config.width;
    var gameHeight = this.config.height;
    var size = this.config.kioskSize;
    var startingPoint = this.config.kioskStartingPoint;
    var kiosksQuant = Math.floor(Math.random() * (max - min + 1) + min);
    var sizeByKiosk = size + this.config.botSize+5;
    if(gameWidth/kiosksQuant<sizeByKiosk)
        kiosksQuant = Math.floor(gameWidth/sizeByKiosk);
    else{
        sizeByKiosk = gameWidth/kiosksQuant;
    }
    for(var i = 0; i < plantsQuant; i++){
        var kioskObj = {x:0, y:startingPoint, health:100, time: 1000};
        kioskObj.x = i*sizeByKiosk;
        this.kiosks[0].push(kioskObj);
        this.kiosks[1].push(kioskObj);
    }
}
Simulation.prototype.generatePeople = function(){
    
}