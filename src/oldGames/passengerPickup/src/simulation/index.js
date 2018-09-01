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
//Passenger collective
function generateCollectives(gameId, min, max, arr) {
    var collectives = [];
      var passengersQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < passengersQuant; i++) {
      var passenger = new Passenger();
      passenger.setRandomPos(arr);
      collectives.push(passenger);
    }
    return collectives;
}
//random position on map for rundom collective
function setRandomPos(arr){
    this.x = Math.floor(Math.random()*(window.innerWidth/2/30-2))*30;
    this.y = Math.floor(Math.random()*(window.innerHeight*0.8/30-2))*30;
    var rowId = Math.floor(this.y/30);
    var colId = Math.floor(this.x/30);
    while(!arr[rowId]||!arr[rowId][colId]){
        this.x = Math.floor(Math.random()*window.innerWidth/2/30-2)*30;
        this.y = Math.floor(Math.random()*window.innerHeight*0.8/30-2)*30;
        rowId = Math.floor(this.y/30);
        colId = Math.floor(this.x/30);
    }
    this.takeofX = Math.floor(Math.random()*(window.innerWidth/2/30-2))*30;
    this.takeofY = Math.floor(Math.random()*(window.innerHeight*0.8/30-2))*30;
    var rowId = Math.floor(this.takeofY/30);
    var colId = Math.floor(this.takeofX/30);
    while(!arr[rowId]||!arr[rowId][colId]){
        this.takeofX = Math.floor(Math.random()*window.innerWidth/2/30-2)*30;
        this.takeofY = Math.floor(Math.random()*window.innerHeight*0.8/30-2)*30;
        rowId = Math.floor(this.takeofY/30);
        colId = Math.floor(this.takeofX/30);
    }
}
function moveCharacter(direction, map, bot){
    if(!direction)
        direction = {up:true};
    if(direction.up&&map[bot.y-1]&&map[bot.y-1][bot.x])
        bot.y -= 1;
    else if(direction.down&&map[bot.y+1]&&map[bot.y+1][bot.x])
        bot.y += 1;
    else if(direction.left&&map[bot.y][bot.x-1])
        bot.x -= 1;
    else if(direction.right&&map[bot.y][bot.x+1])
        bot.x += 1;
    if(bot.path.length>0&&bot.path[bot.path.length-1].x==bot.x&&bot.path[bot.path.length-1].y==bot.y)
        bot.path.pop();
    return bot;
}
let simulate = function(config, player1, player2){
    let map = [
        [1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0],
        [0,0,0,0,1,1,1,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,0,1,0,0,1,1,1,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0],
        [0,0,0,1,1,0,0,1,0,0,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0],
        [1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,1],
        [0,0,0,0,1,0,0,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1]
    ];
    var obstacleMap = [new Array(map.length), new Array(map.length)];
    obstacleMap[0] = generateMapFromArray(map);
    obstacleMap[1] = generateMapFromArray(map);
    config =  require('./'+config);
    let bot1clb =  require('./'+player1);
    let bot2clb =  require('./'+player2);

    return new Promise(resolve=>{
        var collectives = [[],[]];
        var bot = [
            [{x:0,y:0,path:[],passenger:null},{x:0,y:0,path:[],passenger:null}],
            [{x:0,y:0,path:[],passenger:null},{x:0,y:0,path:[],passenger:null}]
        ];
        var score = [0,0];
        var bot1_1Data = {player:bot[0][0], collectives:collectives[0], path:bot[0][0].path, passenger:bot[0][0].passenger};
        var bot1_2Data = {player:bot[0][1], collectives:collectives[0], path:bot[0][1].path, passenger:bot[0][1].passenger};
        var bot2_1Data = {player:bot[1][0], collectives:collectives[1], path:bot[1][0].path, passenger:bot[1][0].passenger};
        var bot2_2Data = {player:bot[1][1], collectives:collectives[1], path:bot[1][1].path, passenger:bot[1][1].passenger};
        var direction = [[{}, {}],[{}, {}]];
        var time = config.time*40;
        var errors = 0;
        if(!config.minPassengers){
            console.error("\x1b[31m","Set 'minPassengers' parameter in config json", "\x1b[37m");
            errors++;
        }
        if(typeof config.minPassengers!="number"){
            console.error("\x1b[31m","'minPassengers' parameter in config should be number", "\x1b[37m");
            errors++;
        }
        if(!config.maxPassengers){
            console.error("\x1b[31m","Set 'maxPassengers' parameter in config json");
            errors++;
        }
        if(typeof config.maxPassengers!="number"){
            console.error("\x1b[31m","'maxPassengers' parameter in config should be number", "\x1b[37m");
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
            if(collectives[1].length==0){
                collectives[1] = generateCollectives(1, config.minPassengers, config.maxPassengers, obstacleMap[1]);
                continue;
            }
            if(collectives[0].length==0){
                collectives[0] = generateCollectives(0, config.minPassengers, config.maxPassengers, obstacleMap[0]);
                continue;
            }
            for(var i=collectives[0].length-1;i>=0;i--){
                var bot1 = bot[0][0];
                if(!bot1.passenger&&bot1.x==collectives[0][i].x&&bot1.y==collectives[0][i].y){
                    bot1.passenger = collectives[0][i];
                    collectives[0].splice(i,1);
                    continue;
                }
                else if(bot1.passenger&&bot1.x==bot1.passenger.takeofX&&bot1.y==bot1.passenger.takeofY){
                    bot1.passenger = null;
                    score[0]++;
                    continue;
                }
                
                var bot2 = bot[0][1];
                if(!bot2.passenger&&bot2.x==collectives[0][i].x&&bot2.y==collectives[0][i].y){
                    bot2.passenger = collectives[0][i];
                    collectives[0].splice(i,1);
                }
                else if(bot2.passenger&&bot2.x==bot2.passenger.takeofX&&bot2.y==bot2.passenger.takeofY){
                    bot2.passenger = null;
                    score[0]++;
                }
            }
            for(var i=collectives[1].length-1;i>=0;i--){
                var bot1 = bot[1][0];
                if(!bot1.passenger&&bot1.x==collectives[1][i].x&&bot1.y==collectives[1][i].y){
                    bot1.passenger = collectives[1][i];
                    collectives[1].splice(i,1);
                    continue;
                }
                else if(bot1.passenger&&bot1.x==bot1.passenger.takeofX&&bot1.y==bot1.passenger.takeofY){
                    bot1.passenger = null;
                    score[1]++;
                    continue;
                }
                var bot2 = bot[1][1];
                if(!bot2.passenger&&bot2.x==collectives[1][i].x&&bot2.y==collectives[1][i].y){
                    bot2.passenger = collectives[1][i];
                    collectives[1].splice(i,1);
                }
                else if(bot2.passenger&&bot2.x==bot2.passenger.takeofX&&bot2.y==bot2.passenger.takeofY){
                    bot2.passenger = null;
                    score[1]++;
                }
            }
            bot1_1Data = {player:bot[0][0], collectives:collectives[0], path:bot[0][0].path, passenger:bot[0][0].passenger};
            bot1_2Data = {player:bot[0][1], collectives:collectives[0], path:bot[0][1].path, passenger:bot[0][1].passenger};
            bot2_1Data = {player:bot[1][0], collectives:collectives[1], path:bot[1][0].path, passenger:bot[1][0].passenger};
            bot2_2Data = {player:bot[1][1], collectives:collectives[1], path:bot[1][1].path, passenger:bot[1][1].passenger};
            direction[0][0]=bot1clb(bot1_1Data, 
                (passenger, locationType)=>{
                    if(locationType == "passengerLocation")
                        var pointB = {x:passenger.x, y:passenger.y};
                    else
                        var pointB = {x:passenger.takeofX, y:passenger.takeofY};
                    bot[0][0].path=findShortestPath(obstacleMap[0], bot[0][0], pointB, 0);
                }
            );
            direction[0][1]=bot1clb(bot1_2Data,  
                (passenger, locationType)=>{
                    if(locationType == "passengerLocation")
                        var pointB = {x:passenger.x, y:passenger.y};
                    else
                        var pointB = {x:passenger.takeofX, y:passenger.takeofY};
                    bot[0][1].path=findShortestPath(obstacleMap[0], bot[0][1], pointB, 1);
                }
            );
            direction[1][0]=bot2clb(bot2_1Data,  
                (passenger, locationType)=>{
                    if(locationType == "passengerLocation")
                        var pointB = {x:passenger.x, y:passenger.y};
                    else
                        var pointB = {x:passenger.takeofX, y:passenger.takeofY};
                    bot[1][0].path=findShortestPath(obstacleMap[1], bot[1][0], pointB, 0);
                }
            );
            direction[1][1]=bot2clb(bot2_2Data,   
                (passenger, locationType)=>{
                    if(locationType == "passengerLocation")
                        var pointB = {x:passenger.x, y:passenger.y};
                    else
                        var pointB = {x:passenger.takeofX, y:passenger.takeofY};
                    bot[1][1].path=findShortestPath(obstacleMap[1], bot[1][1], pointB, 1);
                }
            );
            bot[0][0] = moveCharacter(direction[0][0], obstacleMap[0], bot[0][0]);
            bot[0][1] = moveCharacter(direction[0][1], obstacleMap[0], bot[0][1]);
            bot[1][0] = moveCharacter(direction[1][0], obstacleMap[0], bot[1][0]);
            bot[1][1] = moveCharacter(direction[1][1], obstacleMap[0], bot[1][1]);
        }
        resolve({player1:score[0],player2:score[1]});
    });
}

let findShortestPath = function(arr, pointA, pointB, charId){
    var heuristic = function (a,b){
        var x = a.x - b.x;
        var y = a.y - b.y;
        var d = Math.sqrt( x*x + y*y );
        return d;
    };
    var removeFromArray = function(array,elt){
        for(var i = array.length-1; i>=0; i--){
            if(array[i] == elt){
                array.splice(i,1);
            }
        }
    };
    var cellPointA = arr[pointA.y][pointA.x];
    var cellPointB = arr[pointB.y][pointB.x];
    var openSet = [];
    var closeSet = [];
    var path = [];
    var current = cellPointA;
    openSet.push(cellPointA);
    //searching path function started here
    while(openSet.length>0){
        var winner = 0;
        for(var i=0; i < openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }
        var current = openSet[winner];
        if(current === cellPointB){
            var temp = current;
            path.push(temp);
            while(temp.previous[charId]){
                path.push(temp.previous[charId]);
                temp = temp.previous[charId];
            }
            for(var i=0;i<arr.length;i++){
                for(var j=0;j<arr[0].length;j++){
                    if(arr[i][j]){
                        arr[i][j].previous[charId]=undefined;
                    }
                }
            }
            return path;
        }
        removeFromArray(openSet,current);
        closeSet.push(current);
        var neighbors = current.neighbors;
        for(var i=0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!closeSet.includes(neighbor) && !neighbor.wall){
                var tempG = current.g+1;
                var newPath = false;
                if(openSet.includes(neighbor)){
                    if(tempG<neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else{
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if(newPath){
                    neighbor.h = heuristic(neighbor, cellPointB);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous[charId] = current;
                }
            }
        }
    }
}

let generateMapFromArray = function(arr){
    var obstacleMap = [];
    var rowQuantity = arr.length;
    var colQuantity = arr[0].length;
    
    for(var i=0;i<rowQuantity;i++){
      if(obstacleMap[i]===undefined)
        obstacleMap[i] = new Array(arr[i].length);
      for(var j=0;j<colQuantity;j++){
        if(arr[i][j]){
          obstacleMap[i][j] = new Cell(i,j);
        }
      }
    }
    for(var i=0;i<rowQuantity;i++){
      for(var j=0;j<colQuantity;j++){
        if(obstacleMap[i][j])
          obstacleMap[i][j].addNeighbors(obstacleMap);
      }
    }
    return obstacleMap;
}

class Cell{
    constructor(y,x) {
        this.x=x;
        this.y=y;
        this.f=0;
        this.g=0;
        this.b=0;
        this.neighbors = [];
        this.previous = [undefined,undefined];
    }
    addNeighbors(grid){
        var x = this.x;
        var y = this.y;
        var rows = grid.length;
        var cols = grid[0].length;
        
        if(grid[y+1]&&grid[y+1][x]){
            this.neighbors.push(grid[y+1][x]);
        }
        if(grid[y-1]&&grid[y-1][x]){
            this.neighbors.push(grid[y-1][x]);
        }
        if(grid[y]&&grid[y][x+1]){
            this.neighbors.push(grid[y][x+1]);
        }
        if(grid[y]&&grid[y][x-1]){
            this.neighbors.push(grid[y][x-1]);
        }
    }
}

class Passenger{
    constructor(){
      this.x = 0;
      this.y = 0;
      this.takeofX = 0;
      this.takeofY = 0;
    }
    setRandomPos(arr){
      this.x = Math.floor(Math.random()*arr[0].length);
      this.y = Math.floor(Math.random()*arr.length);
      while(!arr[this.y]||!arr[this.y][this.x]){
        this.x = Math.floor(Math.random()*arr[0].length);
        this.y = Math.floor(Math.random()*arr.length);
      }
      this.takeofX = Math.floor(Math.random()*arr[0].length);
      this.takeofY = Math.floor(Math.random()*arr.length);
      while(!arr[this.takeofY]||!arr[this.takeofY][this.takeofX]){
        this.takeofX = Math.floor(Math.random()*arr[0].length);
        this.takeofY = Math.floor(Math.random()*arr.length);
      }
    }
}

module.exports = simulate;