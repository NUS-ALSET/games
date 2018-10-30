import React from 'react';
import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react';

const ScoreDisplay = ({ store, restartGame, pauseResumeGame, playAsPlayer2, initGame }) => (
   <div className="score-display">
    <div> {playAsPlayer2 ? 'Bot' : 'My'} Score: {store.score[0]}</div>
    <div> Time Left: {store.time} sec </div>
    <div>
      <Button
        variant="contained"
        color="primary"
        className="restart"
        onClick={() => restartGame()}
      >
        {initGame ? 'Start Game' : 'Restart'}
      </Button>
      {!initGame && (
        <Button
          variant="contained"
          color="primary"
          className="pause"
          onClick={() => pauseResumeGame()}
        >
          {store.mode === 'play' ? 'Pause' : 'Resume'}
        </Button>
      )}
    </div>
    <div>Level: {store.currentLevel}</div>
    <div> {playAsPlayer2 ? 'My' : 'Bot'} Score: {store.score[1]}</div>
  </div>
)

export default observer(ScoreDisplay);