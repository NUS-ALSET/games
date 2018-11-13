import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './game'

const App = () => {
  const props = {
    playMode: 'manual code',
    levelsToWin: 3,
    gameTime:  200,
    botsQuantities: 1,
    gameType: 'game',
    scoreToWin: 20,
    tournamentScoreToWin:  3,
    singleWindowGame: true,
    players: [{
      id:0,
      name: 'player 1',
      score: 0,
      character: 'GreenCar'
    }, {
      id: 1,
      name: 'player 2',
      score: 0,
      character: 'WhiteCar'
    }, {
      id: 2,
      name: 'player 3',
      score: 0,
      character: ''
    }]
  }

  return (
    <Game
      gameData={props}
      onCommit={() => { }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));