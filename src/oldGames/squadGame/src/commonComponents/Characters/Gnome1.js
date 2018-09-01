import React, { Component } from 'react';
import Sprite from './Sprite';
import { observer } from 'mobx-react';
import img from '../../commonGameAssets/characters/gnome1.png';

class Gnome1 extends Component {
  getAnimationState() {
    switch (this.props.direction) {
      case 'up':
        this.animState = 2;
        break;
      case 'down':
        this.animState = 3;
        break;
      case 'left':
        this.animState = 1;
        break;
      case 'right':
        this.animState = 0;
        break;
      default:
        this.animState = 0;
        break;
    }
  }
  getWrapperStyles() {
    this.getAnimationState();
    var targetX = this.props.position.x;
    var targetY = this.props.position.y;
    return {
      position: 'absolute',
      transform: `translate(${targetX}px, ${targetY}px)`,
      transformOrigin: 'left top'
    };
  }
  render() {
    return (
      <div id={'character'} style={this.getWrapperStyles()}>
        <Sprite
          repeat={true}
          tileWidth={64}
          tileHeight={64}
          src={img}
          ticksPerFrame={4}
          state={this.animState}
          scale={1}
          steps={[7, 7, 7, 7, 0, 0]}
        />
      </div>
    );
  }
}
export default observer(Gnome1);