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
        return;
      }
      // update game time
      if (Math.abs(this.props.store.prevTime - Date.now()) >= 1000) {
        this.props.store.time--;
        this.props.store.prevTime = Date.now();
      }
      this.createNewCoins();
      this.updatePosition();
    }
  }
  playerColliding = (players, id, size, playerX, playerY, direction) => {
    let collide = false;
    players.forEach(player => {
      if(player.id === id)
        return;
      const competitor = this.props.store.position[player.id];
      let x1 = competitor.x - size;
      let x2 = competitor.x + size;
      let y1 = competitor.y;
      let y2 = competitor.y + size;
      if (direction === 'left' || direction === 'right') {
        x1 = competitor.x;
        y1 = competitor.y - size;
      }
      if(
        playerX <= x2 &&
        playerX >= x1 &&
        playerY >= y1 &&
        playerY <= y2
      ) {
        collide = true
      }
  })
      return collide;
  }
  // update player position
  updatePosition = () => {
    const size = Math.floor((((config.playerSize / 30) * this.context.scale) * 100));
    const gameWidth = Math.ceil(config.width * this.context.scale);
    const gameHeight = Math.ceil(config.height * this.context.scale);
    const players = this.props.gameData.players;
    players.forEach( (player) => {
      const {id} = player;
      const positions = this.props.store.position[id];
      let {x, y} = positions;
      const direction = this.props.store.direction[id];
      switch (direction) {
        case 'right' :
          if(!this.playerColliding(players, id, size, x+size, y, direction)) {
            x += config.speed;
            if(x+size > gameWidth)
              x = gameWidth - size
          }
          break;
        case 'down' :
        if(!this.playerColliding(players, id, size, x, y+size, direction)) {
          y += config.speed;
          if(y+size > gameHeight)
            y = gameHeight - size
        }
          break;
        case 'left' :
        if(!this.playerColliding(players, id, size, x, y, direction)) {
        x -= config.speed;
          if (x < 0)
            x = 0
        }
          break;
        default :
        if(!this.playerColliding(players, id, size, x, y, direction)) {
          y -= config.speed;
          if (y < 0)
            y = 0
        }
          break;
      }
      const hittedCoinPos = this.checkCollision(x,y);
      if(hittedCoinPos){
        this.removeCoin(hittedCoinPos);
        this.updateScore(player.id);
      }
      this.props.store.updatePosition(player.id, {x, y}, 1);
    })
  }
  updateScore(playerIndex=0){
    this.props.store.scores[playerIndex] = this.props.store.scores[playerIndex] + 1;
  }
  removeCoin(coinPos){
    this.props.store.coins = this.props.store.coins.filter(coin=>!(coin.x===coinPos.x && coin.y===coinPos.y)) 
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
  createNewCoins() {
    const gameWidth = Math.ceil(config.width * this.context.scale);
    const gameHeight = Math.ceil(config.height * this.context.scale);
    const coinSize = config.coinSize * this.context.scale;
    this.props.store.createNewCoins(gameWidth, gameHeight, coinSize);
  }

  checkCollision(x,y){
    const coinSize = config.coinSize * this.context.scale;
    const maxDisToCollide = coinSize/2;
      return this.props.store.coins.find(coin=>
        coin.x >= (x - maxDisToCollide ) &&
        coin.x <= (x + maxDisToCollide) &&
        coin.y >= (y - maxDisToCollide) &&
        coin.y <= (y + maxDisToCollide) )
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