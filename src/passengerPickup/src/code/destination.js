import React, { Component } from 'react';
import img1 from '../commonGameAssets/characters/PickupGreen.png';
import img2 from '../commonGameAssets/characters/PickupViolet.png';
import Store from './store/passengerPickup';
import Sprite from '../commonComponents/Characters/Sprite';
import { observer } from 'mobx-react';

class Destination extends Component {
  getWrapperStyles(destination) {
    var targetX = destination.takeofX;
    var targetY = destination.takeofY;
    return {
      position: 'absolute',
      transform: `translate(${targetX}px, ${targetY}px)`,
      transformOrigin: 'left top',
      width: '30px',
      height: '30px'
    };
  }
  render() {
    return (
      <div>
        {Store.destinationPoint[this.props.gameId][0]!==null&&<div id={'destination'+this.props.gameId+'_0'} 
        style={this.getWrapperStyles(Store.destinationPoint[this.props.gameId][0])}>
          <Sprite
            repeat={true}
            tileWidth={102}
            tileHeight={102}
            src={img1}
            ticksPerFrame={4}
            state={0}
            scale={0.3}
            steps={[7]}
          />
        </div>}
        {Store.destinationPoint[this.props.gameId][1]!==null&&<div id={'destination'+this.props.gameId+'_1'} 
        style={this.getWrapperStyles(Store.destinationPoint[this.props.gameId][1])}>
          <Sprite
            repeat={true}
            tileWidth={102}
            tileHeight={102}
            src={img2}
            ticksPerFrame={4}
            state={0}
            scale={0.3}
            steps={[7]}
          />
        </div>}
    </div>
    );
  }
}
export default observer(Destination);