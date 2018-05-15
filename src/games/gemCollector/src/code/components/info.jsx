import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const getModeText = mode => {
  switch (mode) {
    case 'player-vs-player': {
      return 'Player vs Player';
    }
    case 'player-vs-bot': {
      return 'Player vs Bot';
    }
    case 'bot-vs-bot': {
      return 'Bot vs Bot';
    }
    default: {
      return 'Bot vs Custom';
    }
  }
};
class Info extends Component {
  static propTypes = {
    mode: PropTypes.string,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  render() {
    return <div className="info-wraper">{getModeText(this.props.mode)}</div>;
  }
}
export default observer(Info);
