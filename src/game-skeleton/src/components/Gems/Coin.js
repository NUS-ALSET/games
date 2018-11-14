import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TileMap } from 'react-game-kit';
import { observer } from 'mobx-react';
import config from '../../config'
import Img from '../../assets/tiles/gem.png';

class Coin extends Component {
  static contextTypes = {
    scale: PropTypes.number,
  };

  render() {
    const {scale} = this.context;
    const {coinPosition} = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          transform: `translate(${coinPosition.x * scale}px,
            ${coinPosition.y * scale}px) translateZ(0)`,
          transformOrigin: 'top left',
          width: config.coinSize * scale + 'px',
          height: config.coinSize * scale + 'px',
        }}
      >
        <TileMap src={Img} rows={1} columns={1} tileSize={config.coinSize} layers={[[1]]} />
      </div>
    )
  }
}

export default observer(Coin);