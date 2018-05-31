import React from 'react';
import ReactDOM from 'react-dom';
import PlantSavior from './plantSavior.js';

const player1Keys={left:'a',right:'d', up:'w', down:'s', action:'r'};
const player2Keys={left:'j',right:'l', up:'i', down:'k', action:'p'};

ReactDOM.render(<PlantSavior                  
		showCodeEditor={true}          
		mode={'player-vs-player'}                     
		player1Keys = {player1Keys}
		player2Keys = {player2Keys}
	/>, document.getElementById('root'));