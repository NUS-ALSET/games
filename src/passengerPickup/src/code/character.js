import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyListener } from 'react-game-kit';
import Gnome1 from '../commonComponents/Characters/Gnome1';
import Gnome2 from '../commonComponents/Characters/Gnome2';
import Blonde from '../commonComponents/Characters/Blonde';
import Brunette from '../commonComponents/Characters/Brunette';
import Drone1 from '../commonComponents/Characters/Drone1';
import Drone2 from '../commonComponents/Characters/Drone2';
import Drone3 from '../commonComponents/Characters/Drone3';
import BlackCar from '../commonComponents/Characters/CarBlack';
import BlueCar from '../commonComponents/Characters/CarBlue';
import OrangeCar from '../commonComponents/Characters/CarOrange';
import WhiteCar from '../commonComponents/Characters/CarWhite';
import Store from './store/passengerPickup';
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
    this.getCollectives = this.getCollectives.bind(this);
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
    if (Util.rect2parent(player, parentEl, direction) && Store.mode == 'play' && this.isInsideRoad(direction))
      Store.moveCharacter(this.props.gameId, this.props.charId);
    this.getCollectives();
    
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.gameId, this.props.charId);
    }
  }
  isInsideRoad(direction){
    switch(direction){
      case 'up':
        var rowId = Math.floor( Store.position[this.props.gameId][this.props.charId].y/30 );
        var colId = Math.floor( (Store.position[this.props.gameId][this.props.charId].x+10)/30 );
        break;
      case 'down':
        var rowId = Math.floor( (Store.position[this.props.gameId][this.props.charId].y+20)/30 );
        var colId = Math.floor( (Store.position[this.props.gameId][this.props.charId].x+10)/30 );
        break;
      case 'left':
        var rowId = Math.floor( (Store.position[this.props.gameId][this.props.charId].y+10)/30 );
        var colId = Math.floor( Store.position[this.props.gameId][this.props.charId].x/30 );
        break;
      case 'right':
        var rowId = Math.floor( (Store.position[this.props.gameId][this.props.charId].y+10)/30 );
        var colId = Math.floor( (Store.position[this.props.gameId][this.props.charId].x+20)/30 );
        break;
      default:
        break;
    }
    if(Store.obstacleMap[this.props.gameId][rowId]&&Store.obstacleMap[this.props.gameId][rowId][colId])
      return true;
    return false;
  }
  getCollectives() {
    if(Store.destinationPoint[this.props.gameId][this.props.charId]==null){
      var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId);
      var parentEl = player.parentElement;
      player = player.childNodes[0];
      var collectives = parentEl.getElementsByClassName('collective');
      Array.from(collectives).forEach(collective => {
        if (Util.rect2Rect(collective, player)) {
          var collectiveId = collective.getAttribute('data-key');
          Store.removeCollective(this.props.gameId, this.props.charId, collectiveId);
        }
      });
    }
    else{
      var player = document.getElementById('pl' + this.props.charId + '-' + this.props.gameId);
      player = player.childNodes[0];
      var destination = document.getElementById('destination' + this.props.gameId + '_' + this.props.charId);
      
      if (Util.rect2Rect(destination, player)) {
        console.log('destination' + this.props.gameId + '_' + this.props.charId);
        Store.loadOutPassengers(this.props.gameId, this.props.charId);
      }
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
      case 'gnome1':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Gnome1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'gnome2':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Gnome2
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'blonde':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Blonde
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'brunette':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Brunette
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
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
      case 'black-car':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <BlackCar
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'blue-car':
       return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
         <BlueCar
           position={Store.position[this.props.gameId][this.props.charId]}
           direction={Store.direction[this.props.gameId][this.props.charId]}
         />
       </div>;
      case 'orange-car':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <OrangeCar
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'white-car':
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <WhiteCar
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      default:
        return <div id={'pl' + this.props.charId + '-' + this.props.gameId}>
          <Gnome1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
    }
  }
}
export default observer(Character);