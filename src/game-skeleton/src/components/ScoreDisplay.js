import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { NOT_STARTED, PAUSED, PLAY } from '../constants';
import PropTypes from 'prop-types';

const ScoreDisplay = ({
  store,
  endGame,
  pauseResumeGame,
  gameState,
  startGame,
  players }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    className="score-display"
  >
    <Grid item xs={4}>
      <Typography variant="subheading">
        Time Left: {store.time} sec
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Grid container justify="center">
        {gameState === NOT_STARTED ?
          <Button
            variant="contained"
            color="primary"
            className="start"
            onClick={() => startGame(PLAY)}
          >
            Start Game
          </Button> :
          <Fragment>
            <Button
              variant="contained"
              color="primary"
              className="restart"
              style={{marginRight: '10px'}}
              onClick={() => endGame(NOT_STARTED)}
            >
              End Game
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="restart"
              onClick={pauseResumeGame}
            >
              {gameState === PAUSED ? 'Resume' : 'Pause'}
            </Button>
          </Fragment>
        }
      </Grid>
    </Grid>
    <Grid item xs={4} >
      <Grid container direction="row" spacing={16} alignItems="center">
        <Grid item>
          <Typography variant="subheading">
            Score:
          </Typography>
        </Grid>
        <Grid item>
          {players.map(player => (
              <Typography variant="body1">
                {player.name}: {store.scores[player.id]}
              </Typography>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

ScoreDisplay.propTypes = {
  store: PropTypes.object,
  endGame: PropTypes.func.isRequired,
  pauseResumeGame: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
}

export default observer(ScoreDisplay);