import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import Character from './character';
import Bot from './bot';
import Plant from './plant';
import Water from './water';
import Factory from './factory';
import Controls from './controls';
import CodeEditor from './code-editor';
import Store from './store/plantSavior';

export default class PlantSavior extends Component {
  componentDidMount() {
    //console.log(document.getElementById('codeEditor').value);
    if (document.getElementById('codeEditor'))
      Store.func = document.getElementById('codeEditor').value;
  }
  getWrapperStyles() {
    return {
      height: '95vh',
      width: '100%',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left'
    };
  }
  getGameWrapperStyles() {
    return {
      height: '100%',
      width: '50%',
      float: 'left',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left'
    };
  }
  getGameStyles() {
    return {
      height: '80%',
      width: '100%',
      float: 'left',
      transform: 'translate(0px, 10%) translateZ(0)',
      transformOrigin: 'top left',
      background: '#3a9bdc'
    };
  }
  render() {
    console.log(this.props);
    return <div><div style={this.getWrapperStyles()}>
      <Loop>
        <Controls
            onPlay={this.props.onPlay}
            onPause={this.props.onPause}
            onEnd={this.props.onEnd}
        />
        <div id={'game0'} style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
          <Tile tiles={this.props.gameData.config.game1.tiles} />
		      <Water/>
		      <Factory/>
          <Plant gameId={0}/>;
          {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'player-vs-player') &&
            <Character
              gameId={0}
              charId={0}
              type={this.props.gameData.config.game1.character1.type}
              keys={this.props.gameData.player1Keys}
            />}
          {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'player-vs-player') &&
            <Character
              gameId={0}
              charId={1}
              type={this.props.gameData.config.game1.character2.type}
              keys={this.props.gameData.player1Keys}
            />}
          {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              gameId={0}
              charId={0}
              type={this.props.gameData.config.game1.character1.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player1Function={this.props.player1Function}
              onError={this.props.onError}
            />}
          {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              gameId={0}
              charId={1}
              type={this.props.gameData.config.game1.character2.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player1Function={this.props.player1Function}
              onError={this.props.onError}
            />}
        </Stage></div>
        <div id={'game1'} style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
          <Tile tiles={this.props.gameData.config.game2.tiles} />
          <Water/>
          <Factory/>
          <Plant gameId={1}/>;
          {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'player-vs-player') &&
            <Character
              gameId={1}
              charId={0}
              type={this.props.gameData.config.game2.character1.type}
              keys={this.props.gameData.player2Keys}
            />}
          {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'player-vs-player') &&
            <Character
              gameId={1}
              charId={1}
              type={this.props.gameData.config.game2.character2.type}
              keys={this.props.gameData.player2Keys}
            />}
          {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              gameId={1}
              charId={0}
              type={this.props.gameData.config.game2.character1.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player2Function={this.props.player2Function}
              onError={this.props.onError}
            />}
          {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              gameId={1}
              charId={1}
              type={this.props.gameData.config.game2.character2.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player2Function={this.props.player2Function}
              onError={this.props.onError}
            />}
        </Stage></div>
      </Loop>
    </div>
      {this.props.gameData.showCodeEditor ? <CodeEditor /> : ''}</div>;
  }
}