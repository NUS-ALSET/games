import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App.js';
import Tournament from './simulation/tournament';
import Store from './store';
import level1 from './simulation/level1';
import level2 from './simulation/level2';
import level3 from './simulation/level3';
import './view/style.css';

ReactDOM.render(<Tournament></Tournament>, document.getElementById('simulation'));
ReactDOM.render(<App level1={level1} level2={level2} level3={level3} store={Store}
    time={90}
    botsQuantity={3}
    player1Data={{levelsToWin:2}}
    ></App>, document.getElementById('root'));