import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';

import Tile from './tile';
import Lake from './lake';
import Factory from './factory';
import Characters from './characters';

import Plants from './plants';
import Updater from './updater.js';
import './style.css';

import CodeEditor from './code-editor';

export default class App extends Component {
    /*constructor(props) {
        super(props);
        this.characterArr1 = [];
        this.characterArr2 = [];
        var charactersTypeArr = ['drone1', 'drone2', 'drone3'];
        for(var i=0;i<Store.botsQuantity;i++){
            this.characterArr1.push(<Character key={i} gameId={0} charId={i} type={charactersTypeArr[Math.floor(Math.random()*charactersTypeArr.length)]}></Character>);
            this.characterArr2.push(<Character key={i} gameId={1} charId={i} type={charactersTypeArr[Math.floor(Math.random()*charactersTypeArr.length)]}></Character>);
        }
    }*/
    render() {
        return <Loop>
            <Updater></Updater>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Lake></Lake>
                    <Factory></Factory>
                    <Plants gameId={0}></Plants>
                    <Characters gameId={0}></Characters>
                </Stage>
            </div>
            <div style={{height: '98vh', width: '50%', float:"left"}}>
                <Stage width={500} height={500}>
                    <Tile></Tile>
                    <Lake></Lake>
                    <Factory></Factory>
                    <Plants gameId={1}></Plants>
                    <Characters gameId={1}></Characters>
                </Stage>
            </div>
            <CodeEditor></CodeEditor>
        </Loop>
    }
}