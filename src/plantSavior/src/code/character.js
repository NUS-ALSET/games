import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyListener } from 'react-game-kit';
import Drone1 from '../commonComponents/Characters/Drone1';
import Drone2 from '../commonComponents/Characters/Drone2';
import Drone3 from '../commonComponents/Characters/Drone3';
import Store from './store/plantSavior';
import Util from '../commonFuncs/index';
import { observer } from 'mobx-react';

class Character extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.loop = this.loop.bind(this);
    this.getPlant = this.getPlant.bind(this);
    this.getWater = this.getWater.bind(this);
    this.getPests = this.getPests.bind(this);
    this.keyListener = new KeyListener();
    document.addEventListener('keydown', (e) => {
      if (Store.currentControllable[this.props.gameId] == this.props.charId && Store.mode == 'play') {
        switch (e.key) {
          case this.props.keys.left:
            Store.changeDirection(this.props.gameId, this.props.charId, 'left');
            break;
          case this.props.keys.right:
            Store.changeDirection(this.props.gameId, this.props.charId, 'right');
            break;
          case this.props.keys.up:
            Store.changeDirection(this.props.gameId, this.props.charId, 'up');
            break;
          case this.props.keys.down:
            Store.changeDirection(this.props.gameId, this.props.charId, 'down');
            break;
          case this.props.keys.action:
            Store.switchPlayer(this.props.gameId);
            break;
          default:
            break;
        }
      }
    });
  }
  loop = () => {
    if (!document.getElementById('pl' + this.props.charId + '-' + this.props.gameId))
      return;
    var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId).childNodes[0];
    var parentEl = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId).parentElement;
    var direction = Store.direction[this.props.gameId][this.props.charId];
    if (Util.rect2parent(player, parentEl, direction) && Store.mode == 'play')
      Store.moveCharacter(this.props.gameId, this.props.charId);
    this.getPlant();
    this.getWater();
    this.getPests();
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.gameId, this.props.charId);
    }
  }
  getPlant() {
    var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var plants = parentEl.getElementsByClassName('deseased-plant');
    Array.from(plants).forEach(plant => {
      if (Util.rect2Rect(plant, player)) {
        var plantId = plant.getAttribute('data-key');
        Store.curePlant(this.props.gameId, plantId, this.props.charId);
      }
    });
  }
  getWater(){
    var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var water = parentEl.getElementsByClassName('water');
    if (Util.rect2Rect(water[0], player)&&Store.filled[this.props.gameId][this.props.charId] != 1) {
      console.log('get water');
      Store.filled[this.props.gameId][this.props.charId] = 1;
    }
  }
  getPests(){
    var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var water = parentEl.getElementsByClassName('factory');
    if (Util.rect2Rect(water[0], player)&&Store.filled[this.props.gameId][this.props.charId] != 2) {
      console.log('get pests');
      Store.filled[this.props.gameId][this.props.charId] = 2;
    }
  }
  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }
  render() {
    switch (this.props.type) {
      case 'drone1':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Drone1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'drone2':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Drone2
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'drone3':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Drone3
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      default:
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
            <Drone3
                position={Store.position[this.props.gameId][this.props.charId]}
                direction={Store.direction[this.props.gameId][this.props.charId]}
            />
        </div>;
    }
  }
}
export default observer(Character);