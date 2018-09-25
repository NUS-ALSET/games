import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Character from './character';
import { observer } from 'mobx-react';

class Characters extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  func = false;
  constructor(props, context) {
    super(props);
    var charactersTypeArr = ['drone1', 'drone2', 'drone3'];
    var spriteType;
  }
  render() {
    return <div>
      {this.props.store.position[this.props.gameId].map((pos,index)=>{
        if(index<this.props.store.botsQuantity)
          return <div key={index}><Character store={this.props.store} gameId={this.props.gameId} charId={index} type={'drone1'}></Character></div>
      })}
    </div>
  }
}
export default observer(Characters);