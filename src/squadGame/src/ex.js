//props game component can receive
playerData = {
    playMode: 'MANUAL' || 'CUSTOM',
    playAgainst: 'MANUAL' || 0 || 1 || 2,
    code: [
        {//level1
            pyCode:'',
            jsCode:''
        },
        {//level2
            pyCode:'',
            jsCode:''
        },
        {//level3
            pyCode:'',
            jsCode:''
        }
    ]
}
gameControls = {//there's won't gonna be any UI controls inside component. As you demanded, everything gonna be controlled trough props
    restart: false||true,
    pause: false||true
}
tournamentControls = {//there's won't gonna be any UI controls inside component. As you demanded, everything gonna be controlled trough props
    startTournament: false||true
}
gameData={//here's everything gonna be the way you demanded
    scoreToWinGame:10,
    scoreToWinTournament:20,
    gameTime:120,
    botQuantities: 2
}
gameType = 'GAME' || 'TOURNAMENT' //for only game be shown, tournament be shown
onSimulationComplete// will return tournament data like you described
onCommit//Will return code user updated in case of playerMode='CUSTOM'
onGameOver//will return {score[25,7]}