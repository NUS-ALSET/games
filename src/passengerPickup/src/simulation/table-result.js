import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import Store from '../store';
import Simulation from './simulation.js';

export const simulate = function(botFiles, config, scoreToWin) {
  let player1Score = new Array(botFiles.length);
  let player2Score = new Array(botFiles.length);

  var key1 = 0;
  var key2 = 0;
  let scoresGrid = [...Array(botFiles.length)].map(() => ({
    name: '',
    score: [...Array(botFiles.length)].map(() => ({})),
  }));
  for (let i in botFiles) {
    const bot1 = botFiles[i];
    player1Score[key1] = 0;
    key2 = 0;
    scoresGrid[i].name = bot1.name;
    for (let k in botFiles) {
      const bot2 = botFiles[k];
      scoresGrid[i].score[k].name = bot2.name;
      if (typeof player2Score[key2] !== 'number') player2Score[key2] = 0;
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
        } else {
          player2Score[key2] += 1;
          scoresGrid[i].score[k].score = 0.0;
        }
      } else {
        scoresGrid[i].score[k].score = undefined;
      }
      key2++;
    }

    key1++;
  }
  // add score columns
  for (let i in player1Score) {
    scoresGrid[i].player1Score = player1Score[i].toFixed(1);
    scoresGrid[i].player2Score = player2Score[i].toFixed(1);
    scoresGrid[i].total = (player1Score[i] + player2Score[i]).toFixed(1);
  }
  // sort scoresGrid
  scoresGrid.sort((a, b) => (a.total > b.total ? -1 : a.total < b.total ? 1: 0));
  scoresGrid.forEach(i => {
    i.score = i.score.map(
      (item, index) => (
        i.score[i.score.findIndex(item => item.name === scoresGrid[index].name)])
    );
  });
  Store.tournamentScoreBeaten = player1Score[0] + player2Score[0] > scoreToWin ? true : false;
  return {
    player1Score,
    player2Score,
    scoresGrid,
  };
};
const tableHeading = botFiles =>
  botFiles.map(bot => (
    <TableCell width="15" key={bot.name}>
      {bot.name}
    </TableCell>
  ));

const makeScoreGrid = (array, name, handleOpeningGame) =>
  array.map((item, index) => {
    let comp = true;
    let cell = 'number-won';
    switch (item.score) {
      case 1:
        break;
      case 0.5:
        cell = 'number-even';
        break;
      case 0:
        cell = 'number-lose';
        break;
      default:
        cell = 'empty-cells';
        comp = false;
        break;
    }
    return (
      <TableCell key={index} className={`cell-${cell}`}>
        {comp ? (
          <Button
            variant="container"
            className="restartGame gameScore"
            onClick={() => handleOpeningGame(name, item.name)}
          >
            {item.score}
          </Button>
        ) : (
          ''
        )}
      </TableCell>
    );
  });

const TableResults = ({ botFiles, config, scoreToWin, handleOpeningGame }) => {
  const { scoresGrid } = simulate(botFiles, config, scoreToWin);
  return (
    <Table id="game-result-table" border="0" align="center" cellSpacing={0}>
      <thead>
        <TableRow>
          <TableCell width="5" />
          <TableCell width="5" />
          {tableHeading(scoresGrid)}
          <TableCell width="10" className="cell-player-name">Won as Player 1</TableCell>
          <TableCell width="10" className="cell-player-name">Won as Player 2</TableCell>
          <TableCell width="10" className="cell-player-name">Overall Total</TableCell>
        </TableRow>
      </thead>
      <TableBody>
        <TableRow>
          <TableCell />
          <TableCell className="cell-player-number" rowSpan={botFiles.length + 1}>
            As Player 1
          </TableCell>
          <TableCell className="cell-player-number" colSpan={botFiles.length}>
            As Player 2
          </TableCell>
          <TableCell colSpan={3} />
        </TableRow>
        {scoresGrid.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              {makeScoreGrid(item.score, item.name, handleOpeningGame)}
              <TableCell>{item.player1Score}</TableCell>
              <TableCell>{item.player2Score}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default TableResults;
