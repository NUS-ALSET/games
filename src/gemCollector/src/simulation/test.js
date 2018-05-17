function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


//let tableEnd = "</table>";


let simulate = async function(){
    let botFiles = ["bot1.js", "bot2.js", "bot3.js"];
    let tableStart = "<table>";
    let tableCol = {};

    const simulate = require("./index.js");
    var player1Index = 0;
    var player2Index = 0;
    //var result = await simulate("gemCollector", "config.json", botFile1, botFile2);
    for (let botFile1 of botFiles){
        player1Index++;
        player2Index = 0;
        for (let botFile2 of botFiles){
            player2Index++;
            if(botFile1==botFile2)
                continue;
            var result = await simulate("config.json", botFile1, botFile2);
            if(tableCol[botFile1+"_"+botFile2]){
                tableCol[botFile1+"_"+botFile2][player1Index-1].push(result.player1);
                tableCol[botFile1+"_"+botFile2][player2Index-1].push(result.player2);
            }
            else if(tableCol[botFile2+"_"+botFile1]){
                tableCol[botFile2+"_"+botFile1][player1Index-1].push(result.player1);
                tableCol[botFile2+"_"+botFile1][player2Index-1].push(result.player2);
            }
            else{
                tableCol[botFile1+"_"+botFile2]=new Array(botFiles.length);
                for(var i=0;i<tableCol[botFile1+"_"+botFile2].length;i++){
                    tableCol[botFile1+"_"+botFile2][i] = [];
                }
                tableCol[botFile1+"_"+botFile2][player1Index-1].push(result.player1);
                tableCol[botFile1+"_"+botFile2][player2Index-1].push(result.player2);
            }
        }
    }
    botFiles.forEach((element,index) => {
        tableStart += "<tr><td>"+element+"</td>";
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
        tableStart += "</tr>";
    });
    tableStart += "</table>";
    return tableStart;
};
export default simulate;