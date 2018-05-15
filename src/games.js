import React from 'react';
// All games inside games directory
import GemCollector from './games/gemCollector/';
import SquadGemCollector from './games/squadGemCollector/';
import SinglePlayerTwoWindows from './games/singlePlayerTwoWindows/';
import SquadGame from './games/squadGame/';
import PassengerPickup from './games/passengerPickup/';

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