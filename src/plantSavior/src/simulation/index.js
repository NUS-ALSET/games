
function moveCharacter(direction, charId, width, height, bot){
    if(direction.up)
        bot[charId].y -= 1;
    else if(direction.down)
        bot[charId].y += 1;
    else if(direction.left)
        bot[charId].x -= 1;
    else if(direction.right)
        bot[charId].x += 1;
    if(bot[charId].y<0)
        bot[charId].y=0;
    if(bot[charId].y>height)
        bot[charId].y=height;
    if(bot[charId].x<0)
        bot[charId].x=0;
    if(bot[charId].x>width)
        bot[charId].x=width;
    return bot[charId];
}
function findPlantWithSamePosition(plant, plants){
    var isClone = false;
    for (var i = 0; i < plants.length; i++) {
        if(plants[i].x == plant.x&&plants[i].y == plant.y)
            isClone = true;
    }
    return isClone;
}
function generatePlants(gameWidth, gameHeight, min, max) {
    var plants = [];
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
        var stoneObj = { x: 0, y: 0, state: 0, life: 95, time: 400 };
        stoneObj.x =
            Math.floor(Math.random() * (gameWidth - 0 - 1) + 0);
        stoneObj.y =
            Math.floor(Math.random() * (gameHeight - 2) + 2);
        if(!this.findPlantWithSamePosition(stoneObj, plants)){
            plants.push(stoneObj);
        }
    }
    return plants;
    /*his.healthyPlants[0] = this.plants[0].length;
    this.healthyPlants[1] = this.plants[0].length;
    this.alivePlants[0] = this.plants[0].length;
    this.alivePlants[1] = this.plants[0].length;*/
}
function deseaseRandomPlant(plants, gameId){
    if(Math.random()<0.01){
        var gameId = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        var plantId = Math.floor(Math.random() * ((plants[gameId].length-1) - 0 + 1) + 0);
        var newState = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        if(plants[gameId][plantId].state == 0){
            plants[gameId][plantId].state = newState;
        }
        if(gameId==0&&plants[1][plantId].state==0){
            plants[1][plantId].state=newState;
        }
        if(gameId==1&&plants[0][plantId].state==0){
            plants[0][plantId].state=newState;
        }
    }
}
let simulate = function(config, player1, player2){
    config =  require('./'+config);
    let bot1clb =  require('./'+player1);
    let bot2clb =  require('./'+player2);

    return new Promise(resolve=>{
        var collectives = [[],[]];
        var bot = [[{x:0,y:0},{x:0,y:0}],[{x:0,y:0},{x:0,y:0}]];
        var direction = [[{}, {}],[{}, {}]];
        var time = config.time*40;
        var errors = 0;

        if(!config.width){
            console.error("\x1b[31m","Set 'width' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.width!="number"){
            console.error("\x1b[31m","'width' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.height){
            console.error("\x1b[31m","Set 'height' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.height!="number"){
            console.error("\x1b[31m","'height' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.minPlants){
            console.error("\x1b[31m","Set 'minPlants' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.minPlants!="number"){
            console.error("\x1b[31m","'minPlants' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.maxPlants){
            console.error("\x1b[31m","Set 'maxPlants' parameter in config json");
            errors++;
        }
        if(typeof config.maxPlants!="number"){
            console.error("\x1b[31m","'maxPlants' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.time){
            console.error("\x1b[31m","Set 'time' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.time!="number"){
            console.error("\x1b[31m","'time' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(typeof bot1clb!="function"){
            console.error("\x1b[31m","'player1' parameter you feed should be a function", "\x1b[37m");
            errors++;
        }
        if(typeof bot2clb!="function"){
            console.error("\x1b[31m","'player2' parameter you feed should be a function", "\x1b[37m");
            errors++;
        }
        if(errors>0)
            return;
        
        while(time){
            time--;
        }
    });
}