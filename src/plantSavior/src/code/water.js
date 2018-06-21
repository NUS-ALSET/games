import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from 'prop-types';
import img from '../commonGameAssets/Tiles/water-tile.jpg';

export default class Water extends Component {
  static contextTypes = {
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left',
      width: '100px',
      height: '150px'
    };
  }

  render() {
    const tileData = this.props.tileData;
    return (
      <div className={'water'} style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: 0, left: 0 }}
          src={img}
          rows={3}
          columns={2}
          tileSize={50 / this.context.scale}
          layers={[[1]]}
        />
      </div>
    );
  }
}