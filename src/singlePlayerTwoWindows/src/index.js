import React from 'react';
import ReactDOM from 'react-dom';
import SinglePlayerTwoWindows from './singlePlayerTwoWindows.js';
import Simulation from './simulation/tournament';

const player1Keys={left:'a',right:'d', up:'w', down:'s', action:'r'};
const player2Keys={left:'j',right:'l', up:'i', down:'k', action:'p'};

ReactDOM.render(<SinglePlayerTwoWindows                  
		showCodeEditor={true}          
		mode={'bot-vs-bot'}                     
		player1Keys = {player1Keys}
		player2Keys = {player2Keys}
	/>, document.getElementById('root'));
	
ReactDOM.render(<Simulation/>, document.getElementById('simulation'));