import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import img from '../../commonGameAssets/obstacles/fir-tree.png';

export default class Bush extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    const obstacleData = this.props.obstacleData;
    return {
      position: 'absolute',
      transform: 'translate(' + this.props.obstacleData.x + 'px, ' + this.props.obstacleData.y + 'px) translateZ(0)',
      transformOrigin: 'top left',
      width: obstacleData.width,
      height: obstacleData.height
    };
  }

  render() {
    return (
      <div className={'obstacle'} style={this.getWrapperStyles()} >
        <img
          style={{ 'width': '100%', 'height': '100%' }}
          src={img}
        />
      </div>
    );
  }
}