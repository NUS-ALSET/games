import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Character from './Characters/';
import config from '../config';

class Characters extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  render() {
    return (
      <Character
        key={0}
        character={this.props.player.character}
        store={this.props.store}
        scale={this.context.scale}
        size={config.playerSize}
        gameId={this.props.gameId}
        charId={this.props.player.id}
      />
    )}
}
export default observer(Characters);