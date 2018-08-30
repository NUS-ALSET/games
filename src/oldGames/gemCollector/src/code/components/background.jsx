import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';

export default class Background extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='background-Wrapper'>
        <TileMap
          style={{ top: 0 }}
          tileSize={145}
          columns={4}
          rows={4}
          layers={[[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]]}
        />
      </div>
    );
  }
}
