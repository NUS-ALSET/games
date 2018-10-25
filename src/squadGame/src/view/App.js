import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';

import Tile from './tile';
import Characters from './characters';
import Store from '../store';
import Collectives from './collectives';
import Updater from './updater.js';
import Time from './time';
import ScoreDisplay from './ScoreDisplay';
import './style.css';

import CodeEditor from './code-editor';

export default class App extends Component {
    constructor(){
        super();
    }
    render() {
        return <Loop>
            <Updater
                bot1={this.props.bot1}
                bot2={this.props.bot2}
                botsQuant={this.props.botsQuant}
                time={this.props.time}
                restart={this.props.restart}
                pause={this.props.pause}
                onGameOver={this.props.onGameOver}
                store={Store}
            ></Updater>
            <Time store={Store}></Time>
            <ScoreDisplay store={Store} gameId={0}/>
            <ScoreDisplay store={Store} gameId={1}/>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={0} store={Store}></Collectives>
                    <Characters gameId={0} store={Store}></Characters>
                </Stage>
            </div>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={1} store={Store}></Collectives>
                    <Characters gameId={1} store={Store}></Characters>
                </Stage>
            </div>
        </Loop>
    }
}