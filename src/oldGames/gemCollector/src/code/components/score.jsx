import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Score extends Component {
  static propTypes = {
    store: PropTypes.object,
    left: PropTypes.string,
    right: PropTypes.string,
    playerId: PropTypes.number,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
  }

  render() {
    let playerNum = this.props.playerId + 1;
    return (
      <div className='score-wraper' style={{left: this.props.left, right: this.props.right}}>
        {'Player ' + playerNum + ': ' + this.props.store.score[this.props.playerId]}
      </div>
    );
  }
}
export default observer(Score);
