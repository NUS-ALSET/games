function createRandomCollectives(min,max,gameWidth,gameHeight){
    var collectives = [];
    var size = 1;
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x =
        Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
      stoneObj.y =
        Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
      stoneObj.size = size;
      collectives.push(stoneObj);
    }
    return collectives;
}
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
let simulate = function(config, player1, player2){
    config =  require('./'+config);
    let bot1clb =  require('./'+player1);
    let bot2clb =  require('./'+player2);

    return new Promise(resolve=>{
        var collectives = [[],[]];
        var bot = [[{x:0,y:0},{x:0,y:0}],[{x:0,y:0},{x:0,y:0}]];
        var score = [0,0];
        var bot1_1Data = {player:bot[0][0], collectives:collectives[0]};
        var bot1_2Data = {player:bot[0][1], collectives:collectives[0]};
        var bot2_1Data = {player:bot[1][0], collectives:collectives[1]};
        var bot2_2Data = {player:bot[1][1], collectives:collectives[1]};
        var direction = [[{}, {}],[{}, {}]];
        var time = config.time*40;
        var errors = 0;
        var setStartingPosition = false;
        if(!setStartingPosition){
            bot[0][0].x=config.width-1;
            setStartingPosition=true;
        }
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
        if(!config.minGems){
            console.error("\x1b[31m","Set 'minGems' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.minGems!="number"){
            console.error("\x1b[31m","'minGems' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.maxGems){
            console.error("\x1b[31m","Set 'maxGems' parameter in config json");
            errors++;
        }
        if(typeof config.maxGems!="number"){
            console.error("\x1b[31m","'maxGems' parameter in config should be number", "\x1b[37m");
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
            for(var i=collectives[0].length-1;i>=0;i--){
                if(collectives[0][i].x==bot[0][0].x&&collectives[0][i].y==bot[0][0].y){
                    collectives[0].splice(i, 1);
                    score[0]++;
                }
                else if(collectives[0][i].x==bot[0][1].x&&collectives[0][i].y==bot[0][1].y){
                    collectives[0].splice(i, 1);
                    score[0]++;
                }
            }
            for(var i=collectives[1].length-1;i>=0;i--){
                if(collectives[1][i].x==bot[1][0].x&&collectives[1][i].y==bot[1][0].y){
                    collectives[1].splice(i, 1);
                    score[1]++;
                }
                else if(collectives[1][i].x==bot[1][1].x&&collectives[1][i].y==bot[1][1].y){
                    collectives[1].splice(i, 1);
                    score[1]++;
                }
            }
            bot1_1Data = {player:bot[0][0], collectives:collectives[0]};
            bot1_2Data = {player:bot[0][1], collectives:collectives[0]};
            bot2_1Data = {player:bot[1][0], collectives:collectives[1]};
            bot2_2Data = {player:bot[1][1], collectives:collectives[1]};
            if(collectives[1].length==0){
                collectives[1] = createRandomCollectives(config.minGems,config.maxGems, config.width, config.height);
                continue;
            }
            if(collectives[0].length==0){
                collectives[0] = createRandomCollectives(config.minGems,config.maxGems, config.width, config.height);
                continue;
            }
            direction[0][0]=bot1clb(bot1_1Data);
            direction[0][1]=bot1clb(bot1_2Data);
            direction[1][0]=bot2clb(bot2_1Data);
            direction[1][1]=bot2clb(bot2_2Data);
            bot[0][0] = moveCharacter(direction[0][0], 0, config.width, config.height, bot[0]);
            bot[0][1] = moveCharacter(direction[0][1], 1, config.width, config.height, bot[0]);
            bot[1][0] = moveCharacter(direction[1][0], 0, config.width, config.height, bot[1]);
            bot[1][1] = moveCharacter(direction[1][1], 1, config.width, config.height, bot[1]);
            time--;
        }
        resolve({player1:score[0],player2:score[1]});
    });
}

module.exports = simulate;