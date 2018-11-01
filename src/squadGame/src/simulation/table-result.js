import React from 'react'
import Store from '../store';
import Simulation from "./simulation.js";

export const simulate = function (botFiles, config, scoreToWin) {
  let player1Score = new Array(botFiles.length);
  let player2Score = new Array(botFiles.length);

  var key1 = 0;
  var key2 = 0;
  let scoresGrid = [...Array(botFiles.length)]
      .map(() => (
      {
        name: '',
        score: [...Array(botFiles.length)].map(() => ({}))
      }
      ));
  for (let i in botFiles) {
    const bot1 = botFiles[i];
    player1Score[key1] = 0;
    key2 = 0;
    scoresGrid[i].name = bot1.name;
    for (let k in botFiles) {
      const bot2 = botFiles[k]
      scoresGrid[i].score[k].name = bot2.name;
      if (typeof player2Score[key2] !== "number")
        player2Score[key2] = 0;
      if (key1 !== key2) {
        let time = config.time * 60;
        let result;
        const simulation = new Simulation(config, bot1, bot2, Store.botsQuantity);
        while (time > 0) {
          result = simulation.simulate();
          time--;
        }
        if (result.player1 > result.player2) {
          player1Score[key1] += 1;
          scoresGrid[i].score[k].score = 1.0;
        }
        else if (result.player1 < result.player2) {
          player2Score[key2] += 1;
          scoresGrid[i].score[k].score = 0.0;
        }
        else {
          player1Score[key1] += 0.5;
          player2Score[key2] += 0.5;
          scoresGrid[i].score[k].score = 0.5;
        }
      }
      else {
        scoresGrid[i].score[k].score = undefined;
      }
      key2++;
    }

    key1++;
  }
  // add score columns
  for (let i in player1Score) {
    scoresGrid[i].player1Score = player1Score[i].toFixed(1)
    scoresGrid[i].player2Score = player2Score[i].toFixed(1)
    scoresGrid[i].total = (player1Score[i] + player2Score[i]).toFixed(1)
  }
  // sort scoresGrid
  scoresGrid.sort((a, b) => {
    let r = 0;
    a.total > b.total
    ? r = -1
    : a.total < b.total
      ? r = 1
      : r = 0
    return r
  })
  Store.tournamentScoreBeaten = player1Score[0] + player2Score[0] > scoreToWin ? true : false;
  return {
    player1Score,
    player2Score,
    scoresGrid
  };
};
const tableHeading = botFiles => (
    botFiles.map(bot => <td key={bot.name} className='cell-player-name'>{bot.name}</td>)
)

const makeScoreGrid = (array, name, handleOpeningGame) => (
    array.map((item, index) => {
        let comp = true;
        let cell = 'number-won'
        switch(item.score) {
        case 1 :
					break;
        case 0.5 :
            cell = 'number-even'
            break;
        case 0 :
            cell = 'number-lose'
            break;
        default :
            cell = 'empty-cells'
            comp = false
            break;
        }
        return (
            <td key={index} className={`cell-${cell}`}>
                {comp
                    ? <button
                        className='restartGame gameScore'
                        data-bot1={name}
												data-bot2={item.name}
												onClick={() => handleOpeningGame(name, item.name)}
                        >
                          {item.score}
                    </button>
                    : ''
                }
            </td>
        )
    })
);

const TableResults = ({botFiles, config, scoreToWin, handleOpeningGame}) => {
    const {scoresGrid} = simulate(botFiles, config, scoreToWin);

    return (
      <table
        id="game-result-table"
        border='0'
        align='center'
        cellSpacing={0}
      >
        <thead>
          <tr>
            <td></td>
            <td></td>
            {tableHeading(botFiles)}
            <td className='cell-player-name'>Won as Player 1</td>
            <td className='cell-player-name'>Won as Player 2</td>
            <td className='cell-player-name'>Overall Total</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td className="cell-player-number" rowSpan={botFiles.length + 1}>As Player 1</td>
            <td className="cell-player-number" colSpan={botFiles.length}>As Player 2</td>
            <td colSpan={3}></td>
          </tr>
          {scoresGrid.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                {makeScoreGrid(item.score, item.name, handleOpeningGame)}
                <td>{item.player1Score}</td>
                <td>{item.player2Score}</td>
                <td>{item.total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )

}
export default TableResults;