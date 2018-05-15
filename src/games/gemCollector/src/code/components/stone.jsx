import React, { Component } from 'react';
import { TileMap, Body } from 'react-game-kit';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import StoneImg from '../assets/gem.png';

export default class Stone extends Component {
  static propTypes = {
    store: PropTypes.object,
    index: PropTypes.number,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    let player1 = document.getElementById('character-0-' + this.props.mode).childNodes[0];
    let player2 = document.getElementById('character-1-' + this.props.mode).childNodes[0];
    let gem = document.getElementById('stoneGem-' + this.props.index + '-' + this.props.mode);
    if (player1 && player2 && gem) {
      if (this.props.store.rect2Rect(gem, player1)) {
        this.props.onGameEvent({
          type: 'score_update',
          scores: [this.props.store.score[0] + 1, this.props.store.score[1]],
        });
        this.scores = [this.props.store.score[0], this.props.store.score[1]];
        this.props.store.removeHittenGem(this.props.index, 0);
      } else if (this.props.store.rect2Rect(gem, player2)) {
        this.props.onGameEvent({
          type: 'score_update',
          scores: [this.props.store.score[0], this.props.store.score[1] + 1],
        });
        this.props.store.removeHittenGem(this.props.index, 1);
      }
    }
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  render() {
    return (
      <div
        id={'stoneGem-' + this.props.index + '-' + this.props.mode}
        data-id={this.props.index}
        style={{
          position: 'absolute',
          transform: `translate(${this.props.store.stonesData[this.props.index].x * this.context.scale}px,
            ${this.props.store.stonesData[this.props.index].y * this.context.scale}px) translateZ(0)`,
          transformOrigin: 'top left',
          width: 64 * this.context.scale + 'px',
          height: 64 * this.context.scale + 'px',
        }}
      >
        <TileMap className="stone-tilemap-style" src={StoneImg} rows={1} columns={1} tileSize={64} layers={[[1]]} />
      </div>
    );
  }
}
