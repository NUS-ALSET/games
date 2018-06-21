import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import img from '../commonGameAssets/Tiles/factory.png';

export default class Bush extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    const obstacleData = this.props.obstacleData;
    return {
      position: 'absolute',
      transform: 'translate(200px, 0px) translateZ(0)',
      transformOrigin: 'top left',
      width: '100px',
      height: '100px'
    };
  }

  render() {
    return (
      <div className={'factory'} style={this.getWrapperStyles()} >
        <img
          style={{ 'width': '100%', 'height': '100%' }}
          src={img}
        />
      </div>
    );
  }
}