function Simulation(config, bot1clb, bot2clb, botsQuantity){
    this.config = config;
    this.bot1clb = bot1clb;
    this.bot2clb = bot2clb;
    this.quantity = botsQuantity;
    if(!this.config.width||typeof this.config.width!="number"){
        this.config.width = 800;
    }
    if(!this.config.height||typeof this.config.height!="number"){
        this.config.height = 800;
    }
    if(!this.config.minGems||typeof this.config.minGems!="number"){
        this.config.minGems = 10;
    }
    if(!this.config.maxGems||typeof this.config.maxGems!="number"){
        this.config.maxGems = 20;
    }
    if(!this.config.time||typeof this.config.time!="number"){
        this.config.time = 90;
    }
    if(!this.config.speed||typeof this.config.speed!="number"){
        this.config.speed = 0.5;
    }
    if(!this.config.playerSize||typeof this.config.playerSize!="number"){
        this.config.playerSize = 30;
    }
    if(!this.config.collectiveSize||typeof this.config.collectiveSize!="number"){
        this.config.collectiveSize = 30;
    }
    if(!this.config.player1StartingPoint||typeof this.config.player1StartingPoint!="object"){
        this.config.player1StartingPoint = {x:10, y:10};
    }
    if(!this.config.player2StartingPoint||typeof this.config.player2StartingPoint!="object"){
        this.config.player2StartingPoint = {x:200, y:10};
    }
    if(!this.config.player2StartingDirection||typeof this.config.player2StartingDirection!="string"){
        this.config.player2StartingDirection = "right";
    }
    if(!this.config.player2StartingDirection||typeof this.config.player2StartingDirection!="string"){
        this.config.player2StartingDirection = "down";
    }

    this.collectives = [[],[]];
    this.generateCollectives();
    this.bots = [new Array(botsQuantity), new Array(botsQuantity)];
    var minX = this.config.player1StartingPoint.x<this.config.player2StartingPoint.x?this.config.player1StartingPoint.x:this.config.player2StartingPoint.x;
    var maxX = this.config.player1StartingPoint.x>this.config.player2StartingPoint.x?this.config.player1StartingPoint.x:this.config.player2StartingPoint.x;
    var minY = this.config.player1StartingPoint.y<this.config.player2StartingPoint.y?this.config.player1StartingPoint.y:this.config.player2StartingPoint.y;
    var maxY = this.config.player1StartingPoint.y>this.config.player2StartingPoint.y?this.config.player1StartingPoint.y:this.config.player2StartingPoint.y;
    for(var i=0;i<botsQuantity;i++){
        if(i==0){
            this.bots[0][i] = {
                x:this.config.player1StartingPoint.x,
                y:this.config.player1StartingPoint.y
            };
            this.bots[1][i] = {
                x:this.config.player1StartingPoint.x,
                y:this.config.player1StartingPoint.y
            }
        }
        else if(i==botsQuantity-1){
            this.bots[0][i] = {
                x:this.config.player2StartingPoint.x,
                y:this.config.player2StartingPoint.y
            };
            this.bots[1][i] = {
                x:this.config.player2StartingPoint.x,
                y:this.config.player2StartingPoint.y
            }
        }
        else{
            var newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            var newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            this.bots[0][i] = {
                x:newX,
                y:newY
            };
            this.bots[1][i] = {
                x:newX,
                y:newY
            };
        }
    }
    this.score = [0,0];
    this.controlInfo = {keyPressed:["up", "up"], current:[0,0]};
    this.direction = [new Array(botsQuantity), new Array(botsQuantity)];
    this.directionsArr = [{"up":true},{"down":true},{"left":true},{"right":true}];
    for(var i=0; i<botsQuantity; i++){
        var newDirection = this.directionsArr[Math.floor(Math.random()*this.directionsArr.length)]
        this.direction[0][i] = newDirection;
        this.direction[1][i] = newDirection;
    }

    document.addEventListener('keydown', (e) => {
        var gamesQuant = 2;
        for(var gameId = 0; gameId < gamesQuant; gameId++){
            if(e.key==this.config['player'+(gameId+1)+'Keys'].up){
                this.controlInfo.keyPressed[gameId] = "up";
            }
            else if(e.key==this.config['player'+(gameId+1)+'Keys'].down){
                this.controlInfo.keyPressed[gameId] = "down";
            }
            else if(e.key==this.config['player'+(gameId+1)+'Keys'].left){
                this.controlInfo.keyPressed[gameId] = "left";
            }
            else if(e.key==this.config['player'+(gameId+1)+'Keys'].right){
                this.controlInfo.keyPressed[gameId] = "right";
            }
            else if(e.key==this.config['player'+(gameId+1)+'Keys'].switch){
                this.controlInfo.current[gameId] = this.controlInfo.current[gameId]<this.quantity-1?this.controlInfo.current[gameId]+1:0;
            }
        }
    });
}
Simulation.prototype.getDirections       = function(direction){
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
    var gamesQuant = 2;
    var botsData = [new Array(this.quantity), new Array(this.quantity)];
    for(var i=0;i<gamesQuant;i++){
        for(var j=0;j<this.quantity;j++){
            botsData[i][j] = {
                player:this.bots[i][j], collectives:this.collectives[i], direction: this.direction[i][j], index: j, config: this.config, gameId: i,
                controlInfo: this.controlInfo, players: this.bots[i]
            }
        }
    }
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        if(gameId==0)
            var clb = this.bot1clb;
        else
            var clb = this.bot2clb;
        for(var botId = 0; botId < this.quantity; botId++){
            this.direction[gameId][botId] = clb(botsData[gameId][botId]);
        }
    }
    this.direction = this.getDirections(this.direction);
    var botsQuant = this.quantity;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            if(this.direction[gameId][botId]==undefined)
                this.direction[gameId][botId] = this.directionsArr[Math.floor(Math.random()*this.directionsArr.length)];
        }
    }
    this.collectCollectives();
    this.moveCharacters();
    this.generateCollectives();
    return {player1:this.score[0],player2:this.score[1], score:this.score, bots: this.bots, collectives: this.collectives, direction: this.direction};
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

Simulation.prototype.generateCollectives = function(){
    if(this.collectives[0].length > 0&&this.collectives[1].length > 0)
        return;
    this.collectives[0].forEach((item, index, self)=>{
        self[index].id = 0;
        self[index] = JSON.stringify(item);
    });
    this.collectives[1].forEach((item, index, self)=>{
        self[index].id = 0;
        self[index] = JSON.stringify(item);
    });
    var max = this.config.maxGems;
    var min = this.config.minGems;
    var gameWidth = this.config.width;
    var gameHeight = this.config.height;
    var size = this.config.collectiveSize;
    var playerSize = this.config.playerSize;
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
        var stoneObj = { x: 0, y: 0 };
        stoneObj.x =
            Math.floor(Math.random() * (gameWidth / playerSize -  - 0) + 0) * playerSize;
        stoneObj.y =
            Math.floor(Math.random() * (gameHeight / playerSize - 0) + 0) * playerSize;
        stoneObj.size = size;
        stoneObj = JSON.stringify(stoneObj);
        if(this.collectives[0].indexOf(stoneObj)==-1)
            this.collectives[0].push(stoneObj);
        if(this.collectives[1].indexOf(stoneObj)==-1)
            this.collectives[1].push(stoneObj);
    }
    this.collectives[0].forEach((item, index, self)=>{
        self[index] = JSON.parse(item);
        self[index].id = guidGenerator();
    });
    this.collectives[1].forEach((item, index, self)=>{
        self[index] = JSON.parse(item);
        self[index].id = guidGenerator();
    });
}
Simulation.prototype.moveCharacters = function(){
    var botsQuant = this.quantity;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            var direction = this.direction[gameId][botId];
            var bot = this.bots[gameId][botId];
            if(direction.up){
                bot.y -= this.config.speed;
                if(bot.y < 0)
                    bot.y = 0;
            }
            else if(direction.down){
                bot.y += this.config.speed;
                if(bot.y + this.config.playerSize > this.config.height)
                    bot.y = this.config.height - this.config.playerSize;
            }
            else if(direction.left){
                bot.x -= this.config.speed;
                if(bot.x < 0)
                    bot.x = 0;
            }
            else if(direction.right){
                bot.x += this.config.speed;
                if(bot.x + this.config.playerSize > this.config.width)
                    bot.x = this.config.width - this.config.playerSize;
            }
        }
    }
    /*if(this.bots[0][0].x==this.bots[0][1].x&&this.bots[0][0].y==this.bots[0][1].y){
        this.bots[0][0].x+=this.config.playerSize;
        this.bots[0][1].x-=this.config.playerSize;
        this.bots[0][0].y+=this.config.playerSize;
        this.bots[0][1].y-=this.config.playerSize;
    }
    if(this.bots[1][0].x==this.bots[1][1].x&&this.bots[1][0].y==this.bots[1][1].y){
        this.bots[1][0].x+=this.config.playerSize;
        this.bots[1][1].x-=this.config.playerSize;
        this.bots[1][0].y+=this.config.playerSize;
        this.bots[1][1].y-=this.config.playerSize;
    }*/
}
Simulation.prototype.collectCollectives = function(){
    var botsQuant = this.quantity;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            var bot = this.bots[gameId][botId];
            this.collectives[gameId] = this.collectives[gameId].filter((collective)=>{
                //this.score[gameId]++;
                if(
                    (collective.x < bot.x + this.config.playerSize &&
                    collective.x + this.config.playerSize > bot.x)&&
                    (collective.y < bot.y + this.config.playerSize &&
                    collective.y + this.config.playerSize > bot.y)
                ){
                    this.score[gameId]++;
                    return false;
                }
                return true;
            });
        }
    }
}

module.exports = Simulation;