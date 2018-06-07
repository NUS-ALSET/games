function moveCharacter(direction, width, height, bot){
    if(direction.up)
        bot.y -= 1;
    else if(direction.down)
        bot.y += 1;
    else if(direction.left)
        bot.x -= 1;
    else if(direction.right)
        bot.x += 1;
    if(bot.y<0)
        bot.y=0;
    if(bot.y>height)
        bot.y=height;
    if(bot.x<0)
        bot.x=0;
    if(bot.x>width)
        bot.x=width;
    return bot;
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
function deseaseRandomPlant(plants){
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
function getPlant(player, plants) {
    for(var i=plants[0].length;i<=0;i++){
        if(plants[0][i].x==player[0][0].x&&plants[0][i].y==player[0][0].y){
            if(plants[0][i].state==1&&player[0][0].filled==1){
                plants[0][i] = { x: plants[0][i].x, y: plants[0][i].y, state: 0, life: 95, time: 400 };
            }
            else if(plants[0][i].state==2&player[0][0].filled==2){
                plants[0][i] = { x: plants[0][i].x, y: plants[0][i].y, state: 0, life: 95, time: 400 };
                player[0][0].filled=0;
            }
            if(plants[0][i].state==1&&player[0][1].filled==1){
                plants[0][i] = { x: plants[0][i].x, y: plants[0][i].y, state: 0, life: 95, time: 400 };
            }
            else if(plants[0][i].state==2&player[0][1].filled==2){
                plants[0][i] = { x: plants[0][i].x, y: plants[0][i].y, state: 0, life: 95, time: 400 };
                player[0][1].filled=0;
            }
        }
    }
    for(var i=plants[1].length;i<=0;i++){
        if(plants[1][i].x==player[1][0].x&&plants[1][i].y==player[1][0].y){
            if(plants[1][i].state==1&&player[1][0].filled==1){
                plants[1][i] = { x: plants[1][i].x, y: plants[0][i].y, state: 0, life: 95, time: 400 };
            }
            else if(plants[1][i].state==2&player[1][0].filled==2){
                plants[1][i] = { x: plants[1][i].x, y: plants[1][i].y, state: 0, life: 95, time: 400 };
                player[1][0].filled=0;
            }
            if(plants[1][i].state==1&&player[1][1].filled==1){
                plants[1][i] = { x: plants[1][i].x, y: plants[1][i].y, state: 0, life: 95, time: 400 };
            }
            else if(plants[1][i].state==2&player[1][1].filled==2){
                plants[1][i] = { x: plants[1][i].x, y: plants[1][i].y, state: 0, life: 95, time: 400 };
                player[1][1].filled=0;
            }
        }
    }
}
function getWater(player) {
    
}
function getPests(player) {
    
}
let simulate = function(config, player1, player2){
    config =  require('./'+config);
    let bot1clb =  require('./'+player1);
    let bot2clb =  require('./'+player2);

    return new Promise(resolve=>{
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
        var filled = [[0,0],[0,0]];
        var plants = [[],[]];
        plants[0] = this.generatePlants(config.width, config.height, config.minPlants, config.maxPlants);
        plants[1] = plants[0];
        var player = [[{x:0,y:0,state:0},{x:0,y:0,state:0}],[{x:0,y:0,state:0},{x:0,y:0,state:0}]];
        var direction = [[{}, {}],[{}, {}]];
        var time = config.time*40;
        while(time){
            time--;
            var bot1_1Data = {
                player: player,
                isFilledWithWater: player[0][0].state==2,
                isFilledWithPests: player[0][0].state==1,
                driedPlants: plants[0].filter(function(plant){
                  return plant.state==2;
                }),
                pestedPlants: plants[0].filter(function(plant){
                  return plant.state==1;
                }),
                sickPlants: [
                  ...plants[0].filter(function(plant){
                    return plant.state==2;
                  }),
                  ...plants[0].filter(function(plant){
                    return plant.state==1;
                  })
                ],
                water: {x:0,y:0},
                factory: {x:200,y:0},
            };
            var bot1_2Data = {
                player: player,
                isFilledWithWater: player[0][1].state==2,
                isFilledWithPests: player[0][1].state==1,
                driedPlants: plants[0].filter(function(plant){
                  return plant.state==2;
                }),
                pestedPlants: plants[0].filter(function(plant){
                  return plant.state==1;
                }),
                sickPlants: [
                  ...plants[0].filter(function(plant){
                    return plant.state==2;
                  }),
                  ...plants[0].filter(function(plant){
                    return plant.state==1;
                  })
                ],
                water: {x:0,y:0},
                factory: {x:200,y:0},
            };
            var bot2_1Data = {
                player: player,
                isFilledWithWater: player[1][0].state==2,
                isFilledWithPests: player[1][0].state==1,
                driedPlants: plants[1].filter(function(plant){
                  return plant.state==2;
                }),
                pestedPlants: plants[1].filter(function(plant){
                  return plant.state==1;
                }),
                sickPlants: [
                  ...plants[1].filter(function(plant){
                    return plant.state==2;
                  }),
                  ...plants[1].filter(function(plant){
                    return plant.state==1;
                  })
                ],
                water: {x:0,y:0},
                factory: {x:200,y:0},
            };
            var bot2_2Data = {
                player: player,
                isFilledWithWater: player[1][1].state==2,
                isFilledWithPests: player[1][1].state==1,
                driedPlants: plants[1].filter(function(plant){
                  return plant.state==2;
                }),
                pestedPlants: plants[1].filter(function(plant){
                  return plant.state==1;
                }),
                sickPlants: [
                  ...plants[1].filter(function(plant){
                    return plant.state==2;
                  }),
                  ...plants[1].filter(function(plant){
                    return plant.state==1;
                  })
                ],
                water: {x:0,y:0},
                factory: {x:200,y:0},
            };
        }
        direction[0][0]=bot1clb(bot1_1Data);
        direction[0][1]=bot1clb(bot1_2Data);
        direction[1][0]=bot2clb(bot2_1Data);
        direction[1][1]=bot2clb(bot2_2Data);
        player[0][0] = moveCharacter(direction[0][0], config.width, config.height, player[0][0]);
        player[0][1] = moveCharacter(direction[0][1], config.width, config.height, player[0][1]);
        player[1][0] = moveCharacter(direction[1][0], config.width, config.height, player[1][0]);
        player[1][1] = moveCharacter(direction[1][1], config.width, config.height, player[1][1]);
    });
}