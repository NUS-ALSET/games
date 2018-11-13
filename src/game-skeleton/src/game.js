import React from 'react';
import GameView from './components/gameView';
import Store from './store';

import './style.css';

const Game = props => <GameView {...props} store={Store} />

export { Game }
