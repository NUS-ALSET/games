import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App.js';
import Tournament from './simulation/tournament';

ReactDOM.render(<Tournament></Tournament>, document.getElementById('simulation'));
ReactDOM.render(<App></App>, document.getElementById('root'));