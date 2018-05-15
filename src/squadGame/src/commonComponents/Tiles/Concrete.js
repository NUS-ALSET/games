import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from 'prop-types';
import img from '../../commonGameAssets/tiles/concrete.jpg';

export default class Concrete extends Component {
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
    };
  }

  render() {
    const tileData = this.props.tileData;
    return (
      <div style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: 0, left: 0 }}
          src={img}
          rows={tileData.rows}
          columns={tileData.columns}
          tileSize={tileData.tileSize / this.context.scale}
          layers={tileData.layers}
        />
      </div>
    );
  }
}