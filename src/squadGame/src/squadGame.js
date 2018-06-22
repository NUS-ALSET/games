import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Util from './commonFuncs/index';
import DefaultConfig from './code/defaultConfig/squadConfig.json';
import SquadGame from './code/';
import CodeEditor from './code/code-editor';
import { defaultJavascriptFunctionCode,defaultPythonCodeFunction} from './commonGameAssets/customCodes'
import './commonGameAssets/css/style.css'

export default class ALSETReactGame extends Component{
  constructor(props){
      super(props);
      this.state ={
        pyCode: defaultPythonCodeFunction,
        jsCode: defaultJavascriptFunctionCode,
        layout : '',
        solutionFeedbackText : ''
      }
      this.getGameData = this.getGameData.bind(this);
      this.handleChanges=this.handleChanges.bind(this);
  }
  handleChanges(key,value){
    this.setState({[key]:value})
  }
  toggleLayout=()=>{
    this.setState({layout : this.state.layout.length===0 ? '-reverse' : ''})
  }
  render() {
    const { layout, solutionFeedbackText} = this.state;
      const gameData = this.getGameData(this.props.game);
      const getCommands = Util.getCommands;
      const showEditor = gameData.showCodeEditor;
      const gameOnly = showEditor ? '' : '-gameonly';
      return (
        <div>
          <div className={"alset-main" + gameOnly + layout}>
            <div className={(showEditor ? "alset-game" : '') + layout}>
                <SquadGame
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    player1Function={this.props.player1Function}
                    player2Function={this.props.player2Function}
                    gameData={gameData} 
                    getCommands={getCommands}
                />
            </div> 
           { showEditor &&
              <div className={"alset-editor" + layout }>
                  <CodeEditor updateProps={this.handleChanges} />
              </div>
            }
          </div>
          <div className="toggle-btn">
            <button onClick={this.toggleLayout}>🔁</button>
          </div>
          { showEditor &&
              <div className="feedback-wrapper">
                <div className="feedback-section">
                    Solution Feedback :
                    <textarea className="feedback-input" value={solutionFeedbackText} onChange={(e)=>this.handleChanges('solutionFeedbackText',e.target.value)}></textarea>
                    <button className="btn active"> Submit </button>
                </div>
            </div>
          }
          </div>
      )
;
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