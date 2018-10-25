import React, { Component } from 'react';
import img from '../assets/collective/trash1.png';
import squadConfig from '../simulation/config.json';
import PropTypes from 'prop-types';

export default class Collective extends Component {
  static contextTypes = {
      scale: PropTypes.number
  };
  render(){
    return <div
      style={{
        position: 'absolute',
        transform: 'translate(' + this.props.collective.x*this.context.scale + 'px, ' + this.props.collective.y*this.context.scale + 'px) translateZ(0)',
        transformOrigin: 'top left',
        width: squadConfig.collectiveSize*this.context.scale,
        height: squadConfig.collectiveSize*this.context.scale
      }}
  >
      <img
        style={{ 'width': '100%', 'height': '100%' }}
        src={img}
      />
    </div>;
  }
}