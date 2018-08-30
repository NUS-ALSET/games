import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';

import Grass from '../commonComponents/Tiles/Grass';
import Sand from '../commonComponents/Tiles/Sand';

export default class Tile extends Component {
  render() {
    return <div>{
      this.props.tiles.map((tile, index) => {
        switch (tile.type) {
          case 'grass':
            return <Grass key={index} tileData={tile} />;
          case 'sand':
            return <Sand key={index} tileData={tile} />;
          default:
            return <Grass key={index} tileData={tile} />;
        }
      })
    }</div>;
  }
}