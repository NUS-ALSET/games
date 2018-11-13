import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NOT_STARTED } from '../constants';
import PropTypes from 'prop-types';


const WinningScreen = ({ restartGame, gameOver, submitSolution }) => {
  return (
    <Fragment>
      {gameOver.status && (
        <div className={"result-display"}>
          <Typography variant="headline">
            {gameOver.message}
          </Typography>
          <Button
            variant="contained"
            onClick={() => restartGame(NOT_STARTED)}
          >
            PLAY AGAIN
          </Button>
          <br></br>
          <Button
            variant="contained"
            onClick={() => submitSolution(NOT_STARTED)}
          >
            SUBMIT SOLUTION
          </Button>
        </div>
      )}
    </Fragment>
  )
}
WinningScreen.proTypes = {
  restartGame: PropTypes.func.isRequired,
  gameOver: PropTypes.object.isRequired,
  submitSolution: PropTypes.func.isRequired,
}

export default observer(WinningScreen);