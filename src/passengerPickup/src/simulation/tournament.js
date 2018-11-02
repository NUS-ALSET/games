import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import Store from '../store';
import App from '../view/App';
import config from './config.json';
import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import TableResults from './table-result';

class Tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: true,
      gameTitle: '',
      firstTimeRunGame: false,
      gameData: props.gameData,
      player1Data: props.player1Data,
      playAsPlayer2: props.playAsPlayer2,
      buttonDisabled: false,
    }
    if (this.state.player1Data.jsCode) {
      Store.func = this.state.player1Data.jsCode;
    }
    else if (this.state.player1Data.pyCode) {
      window.createFunctionFromPython(this.state.player1Data.pyCode);
      Store.func = window.getPlayersCommands;
      Store.editorPyCode = this.state.player1Data.pyCode;
    }
    if (typeof Store.func === 'string')
      // eslint-disable-next-line
      Store.func = eval('(' + Store.func + ')');
    Object.defineProperty(level3, "name", { value: "Hard bot" });
    Object.defineProperty(level2, "name", { value: "Medium bot" });
    Object.defineProperty(level1, "name", { value: "Easy bot" });
    Object.defineProperty(Store.func, "name", { value: "You" });
  }
  handleOpeningGame = (player1, player2) => {
    let {player1Data, playAsPlayer2, gameTitle} = this.state;
    let levelsToWin = null;
    // update player functions in store
    Store.player1Func = this.evaluateCode(player1 === 'level1' || 'level2' || 'level3' ? player1 : 'custom code');
    Store.player2Func = this.evaluateCode(player2 === 'level1' || 'level2' || 'level3' ? player2 : 'custom code');
    // update game title
    gameTitle = player1 + ' vs ' + player2;
    if (Store.player2Func.name === "You") {
      playAsPlayer2 = true;
      levelsToWin = this.getLevelToBeat(Store.player1Func.name);
    }
    else {
      playAsPlayer2 = false;
      levelsToWin = this.getLevelToBeat(Store.player2Func.name);
    }
    // update python custom code in editor
    if (Store.player1Func.name === "You" || Store.player2Func.name === "You") {
      if (Store.editorPyCode)
        player1Data.pyCode = Store.editorPyCode;
      Store.showGameSimulation = true;
    }
    // update state
    this.setState(
      oldState => ({
        playAsPlayer2,
        gameTitle,
        gameData: {...oldState.gameData, levelsToWin},
        player1Data,
      })
    )
  }
  getLevelToBeat(levelName) {
    switch (levelName) {
      case 'level1':
        return 1;
      case 'level2':
        return 2;
      case 'level3':
        return 3;
      case 'Easy bot':
        return 1;
      case 'Medium bot':
        return 2;
      case 'Hard bot':
        return 3;
      default:
        return 1;
    }
  }
  evaluateCode(code) {
    switch (code) {
      case 'level1':
        return level1;
      case 'level2':
        return level2;
      case 'level3':
        return level3;
      case 'Easy bot':
        return level1;
      case 'Medium bot':
        return level2;
      case 'Hard bot':
        return level3;
      default:
        if (typeof Store.func === 'string')
          // eslint-disable-next-line
          Store.func = eval('(' + Store.func + ')')
        Object.defineProperty(Store.func, "name", { value: "You" });
        return Store.func;
    }
  }
  componentWillMount() {
    if (typeof Store.func === 'string')
      // eslint-disable-next-line
      Store.func = eval("(" + Store.func + ")");
    const newConfig = {
      ...config,
      botsQuantityPerGame: this.state.gameData.botsQuantities || config.botsQuantityPerGame,
      time: this.state.gameData.gameTime || config.time,
      scoreToWin: this.state.gameData.scoreToWin || config.scoreToWin
    }
    this.setState({ bots: [level3, level2, level1, Store.func ], newConfig });
  }
  resimulate = () => {
    this.setState(() => ({buttonDisabled: true}))
    const {gameData} = this.state;
    if (typeof Store.func === 'string') {
      Store.func = eval(`(${Store.func})`);
    }
    Object.defineProperty(Store.func, "name", { value: "You" });
    const newConfig = {
      ...config,
      botsQuantityPerGame: gameData.botsQuantities || config.botsQuantityPerGame,
      time: gameData.gameTime || config.time,
      scoreToWin: gameData.scoreToWin || config.scoreToWin
    }
    this.setState(() => ({
      buttonDisabled: false,
      bots: [level3, level2, level1, Store.func ], newConfig
    }));
  }
  render() {
    const {buttonDisabled,
      gameData,
      player1Data,
      playAsPlayer2,
      editorPyCode,
      bots,
      newConfig,
      gameTitle} = this.state;
    return <Fragment>
      {!Store.showGameSimulation ?
        (
          <div style={{ background: 'white' }}>
            <TableResults
              botFiles={bots}
              config={newConfig}
              Store={Store}
              scoreToWin={gameData.tournamentScoreToWin}
              handleOpeningGame={this.handleOpeningGame}
            />
            <div style={{ textAlign: 'right' }}>
              {Store.tournamentScoreBeaten && (
                <button
                  className="btn-smaller control-btn"
                  onClick={e => {this.props.onCommit({ pyCode: editorPyCode })}}
                >
                  Commit
                </button>
              )}
              <Button
                disabled={buttonDisabled}
                color="primary"
                variant="contained"
                onClick={this.resimulate}
              >
                RESIMULATE
              </Button>
            </div>
          </div>
        ) :
        (
          <Fragment>
            <div className="gameHeader">
              <Button
                variant="contained"
                onClick={() => Store.showGameSimulation = false}
              >
                X
              </Button>
              <b>Match: {gameTitle}</b>
            </div>
            <App
              gameData={gameData}
              player1Data={player1Data}
              playAsPlayer2={playAsPlayer2}
              store={Store}
            />
          </Fragment>
        )
      }
    </Fragment>
  }
}
export default observer(Tournament);
