import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import config from '../config';
import { PLAY, GAME_OVER, NOT_STARTED } from '../constants';

class Updater extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.loop = this.loop.bind(this);
    this.state = {
    }
  }
  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    this.reset();
    window.addEventListener('keydown',this.keyListner);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
    window.removeEventListener('keydown',this.keyListner);
  }

  loop = () => {
    if (this.props.store.mode === PLAY) {
      if(this.props.store.time <= 0) {
        this.props.updateGameState(GAME_OVER);
        this.props.store.updateMode(GAME_OVER);
        console.log('ho gya', this.props.store.mode);
        return;
      }
      // update game time
      if (Math.abs(this.props.store.prevTime - Date.now()) >= 1000) {
        this.props.store.time--;
        this.props.store.prevTime = Date.now();
      }
      this.updatePosition()
    }
  }
  // update player position
  updatePosition = () => {
    const playerSize = (((config.playerSize / 30) * this.context.scale) * 100);
    const gameWidth = Math.ceil(config.width * this.context.scale);
    const gameHeight = Math.ceil(config.height * this.context.scale);
    this.props.gameData.players.forEach( (player) => {
      let {x, y} = this.props.store.position[player.id];
      switch (this.props.store.direction[player.id]) {
        case 'right' :
          x += config.speed;
          if(x+playerSize > gameWidth)
            x = gameWidth - playerSize
          break;
        case 'down' :
          y += config.speed;
          if(y+playerSize > gameHeight)
            y = gameHeight - playerSize
          break;
        case 'left' :
        x -= config.speed;
          if (x < 0)
            x = 0
          break;
        default :
          y -= config.speed;
          if (y < 0)
            y = 0
          break;
      }
      this.props.store.updatePosition(player.id, {x, y}, 1);
    })
  }

  reset = () => {
      this.props.store.mode = NOT_STARTED;
      this.gameTime = this.props.gameData.gameTime || config.time;
      this.props.store.time = this.gameTime;
      this.restartGame();
  }
  restartGame = (gameState = PLAY) => {
    this.props.store.score = [0, 0];
    this.props.store.time = this.props.gameData.gameTime || config.time;
    this.props.store.mode = gameState;
  }
  keyListner = (e) => {
      // if game paused do not update direction
      if (this.props.store.mode !== PLAY) {
        return
      }
      this.props.gameData.players.forEach(player => {
        Object.keys(config.playerKeys[player.id]).forEach(item => {
          if (config.playerKeys[player.id][item] === e.key) {
            this.props.store.updateDirection(player.id, item);
          }
        })
      })
  }
  render() {
    return (
      null
    )
  }
}

Updater.propTypes = {
  gameData: PropTypes.object.isRequired
}
export default observer(Updater);