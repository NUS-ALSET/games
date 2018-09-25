import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sprite from './Sprite';
import { observer } from 'mobx-react';
import img from '../../../assets/sprites/drone3.png';

class Drone3 extends Component {
  static contextTypes = {
    scale: PropTypes.number
  };
  getAnimationState() {
    switch (this.props.store.direction[this.props.gameId][this.props.charId]) {
      case 'up':
        this.animState = 3;
        break;
      case 'down':
        this.animState = 2;
        break;
      case 'left':
        this.animState = 0;
        break;
      case 'right':
        this.animState = 1;
        break;
      default:
        this.animState = 1;
        break;
    }
  }
  getWrapperStyles() {
    this.getAnimationState();
    var targetX = this.props.store.position[this.props.gameId][this.props.charId].x*this.context.scale;
    var targetY = this.props.store.position[this.props.gameId][this.props.charId].y*this.context.scale;
    return {
      position: 'absolute',
      transform: `translate(${targetX}px, ${targetY}px)`,
      transformOrigin: 'left top',
      width: '64px',
      height: '64px'
    };
  }
  render() {
    return (
      <div id={'character'} style={this.getWrapperStyles()}>
        <Sprite
          repeat={true}
          tileWidth={160}
          tileHeight={160}
          src={img}
          ticksPerFrame={4}
          state={this.animState}
          scale={(this.props.size/160)*this.context.scale}
          steps={[0, 0, 0, 0]}
        />
      </div>
    );
  }
}
export default observer(Drone3);