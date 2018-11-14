import React, { Component, Fragment } from 'react';
import { Loop } from 'react-game-kit';
import Grid from '@material-ui/core/Grid'
import ScoreDisplay from './ScoreDisplay'
import {PLAY, NOT_STARTED, PAUSED, GAME_OVER} from '../constants'
import config from '../config';
import GameWindow from './gameWindow';
import WinningScreen from './WinningScreen';

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      gameState: NOT_STARTED,
      gameOver: {
        status: true,
        winner: null,
        message: 'Time Over'
      }
    }
  }

  // end game
  endGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.resetGame();
    this.props.store.score = [0, 0];
    this.props.store.time = this.props.gameData.gameTime || config.time;
    this.props.store.mode = gameState;
  }
  // start game
  startGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.mode = gameState;
  }
   // start game
   updateState = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
  }
  // Pause Resume game
  pauseResumeGame = () => {
    this.props.store.mode = this.props.store.mode === PLAY ? PAUSED : PLAY;
    this.setState(() => ({gameState: this.props.store.mode }));
  }
  // Submit Solution
  submitSolution = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
  }

  render() {
    const {gameState, gameOver} = this.state;
    const {store} = this.props;
    
    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <ScoreDisplay
              store={store}
              gameState={gameState}
              endGame={this.endGame}
              startGame={this.startGame}
              pauseResumeGame={this.pauseResumeGame}
              players={this.props.gameData.players}
            />
          </Grid>
          {gameState === NOT_STARTED ? (
            <div>Not Started</div> )
          : gameState === GAME_OVER ? (
            <WinningScreen
              gameOver={gameOver}
              restartGame={this.updateState}
              submitSolution={this.submitSolution}
            /> )
          : (
            <Loop>
              <Grid container spacing={16}>
                <Grid item xs={!this.props.gameData.singleWindowGame ? 6 : 12}>
                  <GameWindow {...this.props} updateGameState={this.startGame} />
                </Grid>
                {!this.props.gameData.singleWindowGame && (
                  <Grid item xs={6}>
                    <GameWindow {...this.props} />
                  </Grid>
                )}
              </Grid>
            </Loop>
          )
        }
        </Grid>
      </Fragment>
  )}
}