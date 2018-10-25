import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import Characters from './characters';

import Collectives from './collectives';
import Updater from './updater.js';
import CodeEditor from './code-editor';

export default class App extends Component {
  render() {
    return <Loop>
      <Updater {...this.props}></Updater>
      <div className="stage">
        <Stage width={800} height={480}>
          <Tile></Tile>
          <Collectives gameId={0} store={this.props.store}></Collectives>
          <Characters gameId={0} store={this.props.store}></Characters>
        </Stage>
      </div>
      {!this.props.gameData.singleWindowGame && <div className="stage">
        <Stage width={800} height={480}>
          <Tile></Tile>
          <Collectives gameId={1} store={this.props.store}></Collectives>
          <Characters gameId={1} store={this.props.store}></Characters>
        </Stage>
      </div>}
      <div className="clear-both"></div>
      {
        this.props.gameData.playMode === 'custom code' &&
        <CodeEditor player1Data={this.props.player1Data}></CodeEditor>
      }
    </Loop>
  }
}