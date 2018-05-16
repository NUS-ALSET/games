import React, { Component } from 'react';

import Bush from '../commonComponents/Objects/Bush';
import FirTree from '../commonComponents/Objects/FirTree';
import PalmTree from '../commonComponents/Objects/PalmTree';
import Stone1 from '../commonComponents/Objects/Stone1';
import Stone2 from '../commonComponents/Objects/Stone2';

export default class Obstacle extends Component {
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
    switch (this.props.obstacle.type) {
      case 'bush':
        return <Bush obstacleData={this.props.obstacle} />;
      case 'fir-tree':
        return <FirTree obstacleData={this.props.obstacle} />;
      case 'palm-tree':
        return <PalmTree obstacleData={this.props.obstacle} />;
      case 'stone1':
        return <Stone1 obstacleData={this.props.obstacle} />;
      case 'stone2':
        return <Stone2 obstacleData={this.props.obstacle} />;
      default:
        return <Bush obstacleData={this.props.obstacle} />;
    }
  }
}