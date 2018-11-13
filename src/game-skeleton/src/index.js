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
    singleWindowGame: true
  }

  return (
    <Game
      gameData={props}
      onCommit={() => { }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));