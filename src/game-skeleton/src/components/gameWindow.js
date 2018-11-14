import React from 'react';
import {observer} from 'mobx-react'
import { Stage } from 'react-game-kit';
import config from '../config';
import Characters from './characters';
import Tile from './tile';
import Updater from './updater.js';
import Coin from './Gems/Coin'



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
            {props.store.coins.map((coinPosition,index) => (
                <Coin key={index} coinPosition={coinPosition} />
            ))}
        </Stage>
    </div>
);

export default observer(GameWindow);