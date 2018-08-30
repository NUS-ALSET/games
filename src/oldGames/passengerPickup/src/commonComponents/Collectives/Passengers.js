import React, { Component } from 'react';
import img from '../../commonGameAssets/collective/passengers.png';

export default class Coin extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    const collectiveData = this.props.collectiveData;
    return {
      position: 'absolute',
      transform: 'translate(' + this.props.collectiveData.x + 'px, ' + this.props.collectiveData.y + 'px) translateZ(0)',
      transformOrigin: 'top left',
      width: collectiveData.size,
      height: collectiveData.size
    };
  }

  render() {
    return (
      <div className={'collective'} data-key={this.props.index} style={this.getWrapperStyles()} >
        <img
          style={{ 'width': '100%', 'height': '100%' }}
          src={img}
        />
      </div>
    );
  }
}