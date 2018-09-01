import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';

import Tile from './tile';
import Character from './character';

import Collectives from './collectives';
import Updater from './updater.js';
import './style.css';

import CodeEditor from './code-editor';

export default class App extends Component {
    render() {
        return <Loop>
            <Updater></Updater>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={0}></Collectives>
                    <Character gameId={0} type={'drone1'}></Character>
                </Stage>
            </div>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Collectives gameId={1}></Collectives>
                    <Character gameId={1} type={'drone2'}></Character>
                </Stage>
            </div>
            <CodeEditor></CodeEditor>
        </Loop>
    }
}