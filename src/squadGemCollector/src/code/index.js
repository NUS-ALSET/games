import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import Character from './character';
import Bot from './bot';
import Collectives from './collectives';
import Obstacle from './obstacle';
import Controls from './controls';
import CodeEditor from './code-editor';
import Store from './store/gemCollector';

export default class GemCollector extends Component {
  componentDidMount() {
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
      width: '100%',
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
    return <div><div style={this.getWrapperStyles()}>
      <Loop>
        <Controls
          onPlay={this.props.onPlay}
          onPause={this.props.onPause}
          onEnd={this.props.onEnd}
          
        />
        <div id={'game0'} style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
          <Tile tiles={this.props.gameData.config.game.tiles} />
          <div>{this.props.gameData.config.game.obstacles.map((obstacle, index) => {
            return <Obstacle key={index} obstacle={obstacle} index={index} />;
          })}</div>
          <Collectives
            type={this.props.gameData.config.game.collectives.type}
            size={this.props.gameData.config.game.collectives.size}
            min={this.props.gameData.config.game.collectives.min}
            max={this.props.gameData.config.game.collectives.max}
            gameId={0}
          />
          {(this.props.gameData.mode == 'player-vs-bot'
            || this.props.gameData.mode == 'player-vs-player') &&
            <Character
              charId={0}
              type={this.props.gameData.config.game.character1.type}
              keys={this.props.gameData.player1Keys}
              
            />}
          {this.props.gameData.mode == 'player-vs-player' &&
            <Character
              charId={1}
              type={this.props.gameData.config.game.character2.type}
              keys={this.props.gameData.player2Keys}
              
            />}
          {this.props.gameData.mode == 'player-vs-bot' &&
            <Bot
              charId={1}
              type={this.props.gameData.config.game.character2.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player1Function={this.props.player1Function}
              onError={this.props.onError}
              
            />}
          {(this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              charId={0}
              type={this.props.gameData.config.game.character1.type}
              getCommands={this.props.getCommands}
              showCodeEditor={this.props.gameData.showCodeEditor}
              player1Function={this.props.player1Function}
              onError={this.props.onError}
              
            />}
          {(this.props.gameData.mode == 'bot-vs-bot') &&
            <Bot
              charId={1}
              type={this.props.gameData.config.game.character2.type}
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