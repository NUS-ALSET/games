import React from 'react';
import { Stage } from 'react-game-kit';
import config from '../config';
import Characters from './characters';
import Tile from './tile';
import Updater from './updater.js';



const GameWindow = (props) => (
    <div className="stage" style={{ width: '100%' }}>
        <Stage width={config.width} height={config.height}>
            <Updater {...props}></Updater>
            <Tile></Tile>
            {props.gameData.players.map(player => (
                <Characters
                    key={player.id}
                    store={props.store}
                    gameId={0}
                    player={player}
                />
            ))}
        </Stage>
    </div>
);

export default GameWindow;