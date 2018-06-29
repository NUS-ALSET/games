function getParameterByName(name) {
	var result = false;
	process.argv.forEach((arg)=>{
		var argArr=arg.split("=");
		if(argArr[0]===name){
			result = argArr[1];
		}
	});
	return result;
}

if(getParameterByName("game")){
    var gameName = getParameterByName("game");
	switch(gameName){
		case 'gemCollector':
            gameFunc = require('./gemCollector/');
            break;
        case 'passengerPickup':
            gameFunc = require('./passengerPickup/');
            break;
        case 'plantSavior':
            gameFunc = require('./plantSavior/');
            break;
		case 'squadGemCollector':
			gameFunc = require('./squadGemCollector/');
			break;
		case 'singlePlayerTwoWindows':
			gameFunc = require('./singlePlayerTwoWindows/');
			break;
		case 'squadGame':
			gameFunc = require('./squad/');
			break;
		default:
			gameFunc = require('./gemCollector/');
			break;
    }
    startSimulation();
}

async function startSimulation(){
    var bot1 = await getBotFunction(getParameterByName("game"), 1);
    var bot2 = await getBotFunction(getParameterByName("game"), 2);
    var bot3 = await getBotFunction(getParameterByName("game"), 3);
    let botFiles = ["bot1.js", "bot2.js", "bot3.js"];
    let tableStart = "";
    let tableBody = "";
    let tableCol = {};
    let sum = [];
    let order = [];

    var player1Index = 0;
    var player2Index = 0;
    for (let botFile1 of botFiles){
        player1Index++;
        player2Index = 0;
        for (let botFile2 of botFiles){
            player2Index++;
            if(botFile1==botFile2)
                continue;
            var first = eval('bot'+player1Index);
            var second = eval('bot'+player2Index);
            var result = await gameFunc("config.json", first, second);
            if(result.player1>result.player2){
                var res1=1;
                var res2=0;
            }
            else if(result.player1<result.player2){
                var res1=0;
                var res2=1;
            }
            else{
                var res1=0.5;
                var res2=0.5;
            }
            if(tableCol[botFile1+"_"+botFile2]){
                tableCol[botFile1+"_"+botFile2][player1Index-1].push(res1.toFixed(1));
                tableCol[botFile1+"_"+botFile2][player2Index-1].push(res2.toFixed(1));
            }
            else if(tableCol[botFile2+"_"+botFile1]){
                tableCol[botFile2+"_"+botFile1][player1Index-1].push(res1.toFixed(1));
                tableCol[botFile2+"_"+botFile1][player2Index-1].push(res2.toFixed(1));
            }
            else{
                tableCol[botFile1+"_"+botFile2]=new Array(botFiles.length);
                for(var i=0;i<tableCol[botFile1+"_"+botFile2].length;i++){
                    tableCol[botFile1+"_"+botFile2][i] = [];
                }
                tableCol[botFile1+"_"+botFile2][player1Index-1].push(res1.toFixed(1));
                tableCol[botFile1+"_"+botFile2][player2Index-1].push(res2.toFixed(1));
            }
            if(!sum[player1Index-1])
                sum[player1Index-1] = 0;
            sum[player1Index-1]+=res1;
            if(!sum[player2Index-1])
                sum[player2Index-1] = 0;
            sum[player2Index-1]+=res2;
        }
    }
    order = sum.slice();
    order.sort(function(a, b){return b-a});
    tableStart += "    Bot      ";
    for(var i=0; i<botFiles.length;i++){
        tableStart += "    "+(i+1)+"     ";
    }
    tableStart += "Total  Rank";
    botFiles.forEach((element,index) => {
        if(index == 0)
            tableBody += ""+(index+1)+"  "+element+"  ";
        else
            tableBody += " "+(index+1)+"  "+element+"  ";
        for (var el in tableCol){
            if (tableCol.hasOwnProperty(el)) {
                if(tableCol[el][index][0]){
                    tableBody += " "+tableCol[el][index][0]+" ";
                }
                else{
                    tableBody += "     ";
                }
                if(tableCol[el][index][1]){
                    tableBody += " "+tableCol[el][index][1]+" ";
                }
                else{
                    tableBody += "     ";
                }
            }
        }
        tableBody+="  "+sum[index].toFixed(1)+" ";
        tableBody+="    "+(order.indexOf(sum[index])+1)+" ";
        tableBody += "\n";
    });
    tableBody += "";
    console.log("\n");
    console.log("\x1b[44m",tableStart, "\x1b[32m", "\x1b[0m");
    console.log("\x1b[32m",tableBody, "\x1b[0m");
    //console.log(tableStart);
    //console.log(tableBody);
}

function getBotFunction(gameName, botNumber){
    return new Promise(function(resolve, reject) {
        var https = require('https');
        var request = https.get('https://raw.githubusercontent.com/MKoth/games/master/src/'+gameName+'/src/simulation/bot'+botNumber+'.js', function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                eval(data);
                if(botNumber==1)
                    resolve(bot1);
                else if(botNumber==2)
                    resolve(bot2);
                else if(botNumber==3)
                    resolve(bot3);
            });
        });
        request.on('error', function (e) {
            reject(e.message);
        });
        request.end();
    });
}