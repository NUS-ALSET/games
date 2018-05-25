function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


//let tableEnd = "</table>";


let simulate = async function(){
    let botFiles = ["bot1.js", "bot2.js", "bot3.js"];
    let tableStart = "<table cellspacing='1' cellpadding='10' border='1' align='center'>";
    let tableCol = {};
    let sum = [];
    let order = [];

    const simulate = require("./index.js");
    var player1Index = 0;
    var player2Index = 0;
    for (let botFile1 of botFiles){
        player1Index++;
        player2Index = 0;
        for (let botFile2 of botFiles){
            player2Index++;
            if(botFile1==botFile2)
                continue;
            var result = await simulate("config.json", botFile1, botFile2);
            //var res1 = Math.floor(result.player1/(result.player1+result.player2)*100)/100;
            //var res2 = Math.floor(result.player2/(result.player1+result.player2)*100)/100;
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
    console.log(sum);
    console.log(order);
    tableStart += "<tr><td colspan='2' align='center'>Bot</td>";
    for(var i=0; i<botFiles.length;i++){
        tableStart += "<td colspan='2' align='center'>"+(i+1)+"</td>";
    }
    tableStart += "<td>Total</td><td>Rank</td>";
    tableStart += "</tr>";
    botFiles.forEach((element,index) => {
        tableStart += "<tr><td>"+(index+1)+"</td><td>"+element+"</td>";
        for (var el in tableCol){
            if (tableCol.hasOwnProperty(el)) {
                if(tableCol[el][index][0]){
                    tableStart += "<td>"+tableCol[el][index][0]+"</td>";
                }
                else{
                    tableStart += "<td></td>";
                }
                if(tableCol[el][index][1]){
                    tableStart += "<td>"+tableCol[el][index][1]+"</td>";
                }
                else{
                    tableStart += "<td></td>";
                }
            }
        }
        tableStart+="<td>"+sum[index].toFixed(1)+"</td>";
        tableStart+="<td align='center'>"+(order.indexOf(sum[index])+1)+"</td>";
        tableStart += "</tr>";
    });
    tableStart += "</table>";
    return tableStart;
};
export default simulate;