import React from 'react';
// All games inside games directory
import GemCollector from './gemCollector/src/gemCollector';
import SquadGemCollector from './squadGemCollector/src/squadGemCollector';
import SinglePlayerTwoWindows from './singlePlayerTwoWindows/src/singlePlayerTwoWindows';
import SquadGame from './squadGame/src/squadGame';
import PassengerPickup from './passengerPickup/src/passengerPickup';

const AlsetReactGame = props => {
  switch (props.game) {
    case 'gemCollector': {
      //'gemCollector'
      return <GemCollector {...props} />;
    }
    case 'squadGemCollector': {
      //'gemCollector'
      return <SquadGemCollector {...props} />;
    }
    case 'singlePlayerTwoWindows': {
      return <SinglePlayerTwoWindows {...props} />;
    }
    case 'squadGame': {
      return <SquadGame {...props} />;
    }
    case 'passengerPickup': {
      return <PassengerPickup {...props} />;
    }
    // create a case here for new game
    default: {
      return <SquadGame {...props} />;
    }
  }
};

AlsetReactGame.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
  onError: () => {},
};

export default AlsetReactGame;