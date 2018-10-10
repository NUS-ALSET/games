import Store from '../store';
function createLink(func1,func2){
    return '?player2='+func1+'&player1='+func2;
}
let simulate = function(botFiles, config){
    let tableStart = `<table id="game-result-table" border='0' align='center' cellspacing=0 cell>
        <tr><td>Totals as Player 2 &#8594;</td>`;
    let tableStart2 = "<tr id='game-result-header'><td>Totals as Player 1 &#8595;</td>";
    let tableStart3 = "";
    let tableStartArr = new Array(botFiles.length);
    let player1Score = new Array(botFiles.length);
    let player2Score = new Array(botFiles.length);
    const Simulation = require("./simulation.js");
    var key1 = 0;
    var key2 = 0;
    for (var bot1 of botFiles){
        tableStart2 += "<td>"+bot1.name+"(2)</td>";
        tableStartArr[key1]  = "<tr><td>"+bot1.name+"(1)</td>";
        player1Score[key1]=0;
        key2 = 0;
        for (var bot2 of botFiles){
            if(typeof player2Score[key2]!=="number")
                player2Score[key2]=0;
            if(key1!==key2){
                var time = config.time*60;
                var result;
                var simulation = new Simulation(config,bot1,bot2,Store.botsQuantity);
                while(time>0){
                    result = simulation.simulate();
                    time--;
                }
                if(result.player1>result.player2){
                    tableStartArr[key1]+="<td><a class='restartGame' data-bot1='"+bot1.name+"' data-bot2='"+bot2.name+"' href='#'>1.0</a></td>";
                    player1Score[key1]+=1;
                }
                else if(result.player1<result.player2){
                    tableStartArr[key1]+="<td><a class='restartGame' data-bot1='"+bot1.name+"' data-bot2='"+bot2.name+"' href='#'>0.0</a></td>";
                    player2Score[key2]+=1;
                }
                else{
                    tableStartArr[key1]+="<td><a class='restartGame' data-bot1='"+bot1.name+"' data-bot2='"+bot2.name+"' href='#'>0.5</a></td>";
                    player1Score[key1]+=0.5;
                    player2Score[key2]+=0.5;
                }
            }
            else{
                tableStartArr[key1]+="<td class='empty-cells'></td>";
            }
            key2++;
        }
        tableStartArr[key1]+="<td>"+player1Score[key1].toFixed(1)+"</td>";
        key1++;
    }
    tableStart2+="</tr>";
    console.log(player1Score);
    console.log(player2Score);
    var sum = player1Score.map(function (num, idx) {
        return {sum:num + player2Score[idx], index:idx};
    });
    sum.sort((a,b)=>{
        if(a.sum>b.sum)
            return -1;
        if(a.sum<b.sum)
            return 1;
        return 0;
    });
    
    console.log(sum);
    //for(var i=botFiles.length-1;i>=0;i--){
    for(var i=0;i<sum.length;i++){
        tableStart+="<td>"+player2Score[sum[i].index].toFixed(1)+"</td>";
        tableStartArr[sum[i].index]+="<td>"+(player1Score[sum[i].index]+player2Score[sum[i].index]).toFixed(1)+"</td></tr>";
        tableStart3+=tableStartArr[sum[i].index];
    }
    tableStart+="<td rowspan=2>Totals as Player1</td><td rowspan=2>Overall Total</td></tr>";
    return tableStart+tableStart2+tableStart3+"</table>";
};
export default simulate;