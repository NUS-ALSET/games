import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';

import Tile from './tile';
import Characters from './characters';

import Collectives from './collectives';
import Updater from './updater.js';
import Time from './time';
import './style.css';

import CodeEditor from './code-editor';

export default class App extends Component {
    render() {
        return <Loop>
            <Updater store={this.props.store}></Updater>
            <Time store={this.props.store}></Time>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={0} store={this.props.store}></Collectives>
                    <Characters gameId={0} store={this.props.store}></Characters>
                </Stage>
            </div>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={1} store={this.props.store}></Collectives>
                    <Characters gameId={1} store={this.props.store}></Characters>
                </Stage>
            </div>
            <CodeEditor></CodeEditor>
        </Loop>
    }
}