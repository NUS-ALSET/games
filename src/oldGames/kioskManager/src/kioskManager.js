import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Util from './commonFuncs/index';
import DefaultConfig from './code/defaultConfig/plantSaviorConfig.json';
import PlantSavior from './code/';

export default class ALSETReactGame extends Component{
  constructor(props){
      super(props);
      this.getGameData = this.getGameData.bind(this);
  }
  render() {
      var gameData = this.getGameData(this.props.game);
      var getCommands = Util.getCommands;
      return <PlantSavior
        onPlay={this.props.onPlay}
        onPause={this.props.onPause}
        onEnd={this.props.onEnd}
        onError={this.props.onError}
        onStateChange={this.props.onStateChange}
        player1Function={this.props.player1Function}
        player2Function={this.props.player2Function}
        gameData={gameData}
        getCommands={getCommands}
      />;
  }
  getGameData(gameType){
      var data = {};
      var defaultConfig = DefaultConfig;
      var customConfig =this.props.config?this.props.config:{};
      data.showCodeEditor = this.props.showCodeEditor||customConfig.showCodeEditor||defaultConfig.showCodeEditor;
      data.config = this.props.config||defaultConfig;
      data.player = this.props.player||customConfig.player||defaultConfig.player;
      data.mode = this.props.mode||customConfig.mode||defaultConfig.mode;
      data.player1Keys = this.props.player1Keys||customConfig.player1Keys||defaultConfig.player1Keys;
      data.player2Keys = this.props.player2Keys||customConfig.player2Keys||defaultConfig.player2Keys;
      return data;
  }
}