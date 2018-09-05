function Simulation(config, bot1clb, bot2clb){
    this.config = config;
    this.bot1clb = bot1clb;
    this.bot2clb = bot2clb;
    if(!this.config.width||typeof this.config.width!="number"){
        this.config.width = 800;
    }
    if(!this.config.height||typeof this.config.height!="number"){
        this.config.height = 800;
    }
    if(!this.config.minPlants||typeof this.config.minPlants!="number"){
        this.config.minPlants = 10;
    }
    if(!this.config.maxPlants||typeof this.config.maxPlants!="number"){
        this.config.maxPlants = 20;
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
    if(!this.config.plantSize||typeof this.config.plantSize!="number"){
        this.config.plantSize = 30;
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
    this.generatePlants();
    this.bots = [
        [
            {
                x:this.config.player1StartingPoint.x,
                y:this.config.player1StartingPoint.y,
                loaded:null
            },
            {
                x:this.config.player2StartingPoint.x,
                y:this.config.player2StartingPoint.y,
                loaded:null
            }
        ],
        [
            {
                x:this.config.player1StartingPoint.x,
                y:this.config.player1StartingPoint.y,
                loaded:null
            },
            {
                x:this.config.player2StartingPoint.x,
                y:this.config.player2StartingPoint.y,
                loaded:null
            }
        ]
    ];
    this.score = [0,0];
    this.controlInfo = {keyPressed:["up", "up"], current:[0,0]};
    this.direction = [[{down:true}, {right:true}],[{down:true}, {right:true}]];
    this.directionsArr = [{"up":true},{"down":true},{"left":true},{"right":true}];

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
                this.controlInfo.current[gameId]=(this.controlInfo.current[gameId]==0?1:0);
            }
        }
    });
}
Simulation.prototype.getDirections = function(direction){
    var botsQuant = 2;
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
    var bot1_1Data = {
        player:this.bots[0][0], collectives:this.collectives[0], direction: this.direction[0][0], index:0, config: this.config, gameId: 0, 
        controlInfo: this.controlInfo, isFilledWithWater:this.bots[0][0].loaded == "water", isFilledWithPests:this.bots[0][0].loaded == "pests",
        driedPlants: this.collectives[0].filter(function(plant){
            return plant.state==1;
        }),
        pestedPlants: this.collectives[0].filter(function(plant){
            return plant.state==2;
        }),
        sickPlants: this.collectives[0].filter(function(plant){
            return plant.state==1||plant.state==2;
        }),
        water: this.config.lakePosition,
        factory: this.config.factoryPosition,
        config: this.config,
        botIndex: 1
    };
    var bot1_2Data = {
        player:this.bots[0][1], collectives:this.collectives[0], direction: this.direction[0][1], index:1, config: this.config, gameId: 0, 
        controlInfo: this.controlInfo, isFilledWithWater:this.bots[0][1].loaded == "water", isFilledWithPests:this.bots[0][1].loaded == "pests",
        driedPlants: this.collectives[0].filter(function(plant){
            return plant.state==1;
        }),
        pestedPlants: this.collectives[0].filter(function(plant){
            return plant.state==2;
        }),
        sickPlants: this.collectives[0].filter(function(plant){
            return plant.state==1||plant.state==2;
        }),
        water: this.config.lakePosition,
        factory: this.config.factoryPosition,
        config: this.config,
        botIndex: 2
    };
    var bot2_1Data = {
        player:this.bots[1][0], collectives:this.collectives[1], direction: this.direction[1][0], index:0, config: this.config, gameId: 1, 
        controlInfo: this.controlInfo, isFilledWithWater:this.bots[1][0].loaded == "water", isFilledWithPests:this.bots[1][0].loaded == "pests",
        driedPlants: this.collectives[1].filter(function(plant){
            return plant.state==1;
        }),
        pestedPlants: this.collectives[1].filter(function(plant){
            return plant.state==2;
        }),
        sickPlants: this.collectives[1].filter(function(plant){
            return plant.state==1||plant.state==2;
        }),
        water: this.config.lakePosition,
        factory: this.config.factoryPosition,
        config: this.config,
        botIndex: 1
    };
    var bot2_2Data = {
        player:this.bots[1][1], collectives:this.collectives[1], direction: this.direction[1][1], index:1, config: this.config, gameId: 1, 
        controlInfo: this.controlInfo, isFilledWithWater:this.bots[1][1].loaded == "water", isFilledWithPests:this.bots[1][1].loaded == "pests",
        driedPlants: this.collectives[1].filter(function(plant){
            return plant.state==1;
        }),
        pestedPlants: this.collectives[1].filter(function(plant){
            return plant.state==2;
        }),
        sickPlants: this.collectives[1].filter(function(plant){
            return plant.state==1||plant.state==2;
        }),
        water: this.config.lakePosition,
        factory: this.config.factoryPosition,
        config: this.config,
        botIndex: 2
    };
    this.direction[0][0]=this.bot1clb(bot1_1Data);
    this.direction[0][1]=this.bot1clb(bot1_2Data);
    this.direction[1][0]=this.bot2clb(bot2_1Data);
    this.direction[1][1]=this.bot2clb(bot2_2Data);
    this.direction = this.getDirections(this.direction);
    var botsQuant = 2;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            if(this.direction[gameId][botId]==undefined)
                this.direction[gameId][botId] = this.directionsArr[Math.floor(Math.random()*this.directionsArr.length)];
        }
    }
    this.collectCollectives();
    this.interactWithFactory();
    this.interactWithLake();
    this.moveCharacters();
    this.deseaseRandomPlant();
    this.decreaseHealth();
    return {
        player1:this.score[0],player2:this.score[1], score:this.score, 
        bots: this.bots, collectives: this.collectives, direction: this.direction
    };
}

Simulation.prototype.generatePlants = function(){
    if(this.collectives[0].length > 0&&this.collectives[1].length > 0)
        return;
    this.collectives[0].forEach((item, index, self)=>{
        self[index] = JSON.stringify(item);
    });
    this.collectives[1].forEach((item, index, self)=>{
        self[index] = JSON.stringify(item);
    });
    var max = this.config.maxPlants;
    var min = this.config.minPlants;
    var gameWidth = this.config.width;
    var gameHeight = this.config.height;
    var size = this.config.collectiveSize;
    var plantSize = this.config.plantSize;
    var plantsStartingPoint = this.config.plantsStartingPoint;
    var plantsQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < plantsQuant; i++) {
        var plantObj = { x: 0, y: 0, health: 100, time: 1000, state: 0 };
        plantObj.x =
            Math.floor(Math.random() * (gameWidth / plantSize - 0 - 1) + 0) * plantSize;
        plantObj.y =
            Math.floor(Math.random() * (gameHeight / plantSize - plantsStartingPoint/plantSize) + plantsStartingPoint/plantSize) * plantSize;
        plantObj.size = size;
        plantObj = JSON.stringify(plantObj);
        if(this.collectives[0].indexOf(plantObj)==-1)
            this.collectives[0].push(plantObj);
        if(this.collectives[1].indexOf(plantObj)==-1)
            this.collectives[1].push(plantObj);
    }
    this.collectives[0].forEach((item, index, self)=>{
        self[index] = JSON.parse(item);
    });
    this.collectives[1].forEach((item, index, self)=>{
        self[index] = JSON.parse(item);
    });
}
Simulation.prototype.moveCharacters = function(){
    var botsQuant = 2;
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
    var botsQuant = 2;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            var bot = this.bots[gameId][botId];
            this.collectives[gameId].forEach((collective)=>{
                if(
                    (collective.x < bot.x + this.config.playerSize &&
                    collective.x + this.config.plantSize > bot.x)&&
                    (collective.y < bot.y + this.config.playerSize &&
                    collective.y + this.config.plantSize > bot.y)
                ){
                    //console.log(bot.loaded+" "+collective.state);
                    if(bot.loaded=='water'&&collective.state == 1){
                        //console.log("cure water");
                        collective.state = 0;
                        collective.time = 400;
                        collective.health = 100;
                        bot.loaded = null;
                    }
                    else if(bot.loaded=='pests'&&collective.state == 2){
                        //console.log("cure pests");
                        collective.state = 0;
                        collective.time = 400;
                        collective.health = 100;
                        bot.loaded = null;
                    }
                }
            });
        }
    }
}
Simulation.prototype.interactWithFactory = function(){
    var botsQuant = 2;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            var bot = this.bots[gameId][botId];
            if(
                (this.config.factoryPosition.x < bot.x + this.config.playerSize &&
                this.config.factoryPosition.x + this.config.factorySize > bot.x)&&
                (this.config.factoryPosition.y < bot.y + this.config.playerSize &&
                this.config.factoryPosition.y + this.config.factorySize > bot.y)
            ){
                bot.loaded = "pests";
            }
        }
    }
}
Simulation.prototype.interactWithLake = function(){
    var botsQuant = 2;
    var gamesQuant = 2;
    for(var gameId = 0; gameId < gamesQuant; gameId++){
        for(var botId = 0; botId < botsQuant; botId++){
            var bot = this.bots[gameId][botId];
            if(
                (this.config.lakePosition.x < bot.x + this.config.playerSize &&
                this.config.lakePosition.x + this.config.lakeSize > bot.x)&&
                (this.config.lakePosition.y < bot.y + this.config.playerSize &&
                this.config.lakePosition.y + this.config.lakeSize > bot.y)
            ){
                bot.loaded = "water";
            }
        }
    }
}
Simulation.prototype.deseaseRandomPlant = function(){
    if(Math.random()<0.01){
        var gameId = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        //var gameId = 0;
        var plantId = Math.floor(Math.random() * ((this.collectives[gameId].length-1) - 0 + 1) + 0);
        var newState = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        if(this.collectives[gameId][plantId].state == 0){
            this.collectives[gameId][plantId].state = newState;
        }
        if(gameId==0&&this.collectives[1][plantId].state==0){
            this.collectives[1][plantId].state=newState;
        }
        if(gameId==1&&this.collectives[0][plantId].state==0){
            this.collectives[0][plantId].state=newState;
        }
    }
}
Simulation.prototype.decreaseHealth = function(){
    this.score = [this.collectives[0].length, this.collectives[1].length];
    for(var i=0;i<this.collectives[0].length;i++){
        if(this.collectives[0][i].state==1||this.collectives[0][i].state==2){
            this.collectives[0][i].time--;
            if(this.collectives[0][i].time<=0){
                this.collectives[0][i].time=400;
                this.collectives[0][i].health-=20;
            }
            if(this.collectives[0][i].health<=0){
                this.collectives[0][i].state=3;
            }
        }
        if(this.collectives[1][i].state==1||this.collectives[1][i].state==2){
            this.collectives[1][i].time--;
            if(this.collectives[1][i].time<=0){
                this.collectives[1][i].time=400;
                this.collectives[1][i].health-=20;
            }
            if(this.collectives[1][i].health<=0){
                this.collectives[1][i].state=3;
            }
        }
        if(this.collectives[0][i].state==3){
            this.score[0]--;
        }
        if(this.collectives[1][i].state==3){
            this.score[1]--;
        }
    }
}

//module.exports = Simulation;