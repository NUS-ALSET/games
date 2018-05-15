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

class Bot extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  func = false;
  constructor(props) {
    super(props);
    this.loop = this.loop.bind(this);
    this.getCollectives = this.getCollectives.bind(this);
    this.calculateShortestPath = this.calculateShortestPath.bind(this);
    this.path = [];
    this.calculatingPath = false;
    this.destination = false;
    this.pathFindingData = {};
  }
  loop = () => {
    if (!document.getElementById('bt' + this.props.charId + '-' + this.props.gameId))
      return;
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId).childNodes[0];
    var parentEl = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId).parentElement;
    var direction = Store.direction[this.props.gameId][this.props.charId];
    if (Store.mode == 'play') {
      if(this.path.length)
      if (Util.rect2parent(player, parentEl, direction)&&this.calculatingPath===false && this.isInsideRoad(direction))
        Store.moveCharacter(this.props.gameId, this.props.charId);
      var world = {
        player: Store.position[this.props.gameId][this.props.charId],
        path: this.path,
        passenger: Store.destinationPoint[this.props.gameId][this.props.charId],
        collectives: Store.collectives[this.props.gameId],
        calculatingPath: this.calculatingPath,
        calculateShortestPath: this.calculateShortestPath
      };
      if (this.props.showCodeEditor&&this.props.gameId===0) {
        try {
          var setDirection = eval('(function(world, findPathCallback){' + Store.func + '}(world, this.calculateShortestPath))');
        }
        catch (err) {
          var setDirection = { down: true };
          if (this.props.onError)
            this.props.onError(err);
        }
      }
      else if (this.props.player1Function)
        var setDirection = this.props.player1Function(world, this.calculateShortestPath);
      else if (this.props.player2Function)
        var setDirection = this.props.player2Function(world, this.calculateShortestPath);
      else
        var setDirection = this.props.getCommands(world, this.calculateShortestPath);
      if (setDirection) {
        if (setDirection.left)
          Store.changeDirection(this.props.gameId, this.props.charId, 'left');
        else if (setDirection.right)
          Store.changeDirection(this.props.gameId, this.props.charId, 'right');
        else if (setDirection.up)
          Store.changeDirection(this.props.gameId, this.props.charId, 'up');
        else if (setDirection.down)
          Store.changeDirection(this.props.gameId, this.props.charId, 'down');
      }
      if(this.path[0]){
        if(this.path[this.path.length-1].x*30==Store.position[this.props.gameId][this.props.charId].x
          &&this.path[this.path.length-1].y*30==Store.position[this.props.gameId][this.props.charId].y
        ){
          //console.log(this.path[this.path.length-1].x*30, Store.position[this.props.gameId][this.props.charId].x);
          //console.log(this.path[this.path.length-1].y*30, Store.position[this.props.gameId][this.props.charId].y);
          this.path.pop();
        }
      }
    }
    
    this.getCollectives();
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.gameId, this.props.charId);
      this.path = [];
      this.calculatingPath = false;
      this.destination = false;
      this.pathFindingData = {};
      Store.clearNeighbors(this.props.gameId, this.props.charId);
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
  calculateShortestPath(passenger=null, passengerType='passengerLocation'){
    this.calculatingPath = true;
    if(!this.destination){
      this.destination = passenger;
      this.pathFindingData.pointA = Store.position[this.props.gameId][this.props.charId];
      if(passengerType=='passengerLocation')
        this.pathFindingData.pointB = {x: passenger.x, y: passenger.y};
      else
        this.pathFindingData.pointB = {x: passenger.takeofX, y: passenger.takeofY};
    }
    Util.findShortestPath(Store.obstacleMap[this.props.gameId], this.pathFindingData, this.props.charId);
    if(this.pathFindingData.path.length>0){
      this.calculatingPath = false;
      this.path = this.pathFindingData.path;
      this.destination = false;
      this.pathFindingData = {};
      Store.clearNeighbors(this.props.gameId, this.props.charId);
    }
  }
  getCollectives() {
    if(Store.destinationPoint[this.props.gameId][this.props.charId]==null){
      var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
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
      var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
      player = player.childNodes[0];
      var destination = document.getElementById('destination' + this.props.gameId + '_' + this.props.charId);
      
      if (Util.rect2Rect(destination, player)) {
        Store.loadOutPassengers(this.props.gameId, this.props.charId);
      }
    }
  }
  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }
  componentWillUnmount() {
    console.log('unmounting');
    this.context.loop.unsubscribe(this.loopID);
  }
  render() {
    switch (this.props.type) {
      case 'gnome1':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Gnome1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'gnome2':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Gnome2
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'blonde':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Blonde
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'brunette':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Brunette
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'drone1':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Drone1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'drone2':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Drone2
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
      case 'drone3':
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Drone3
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
       case 'black-car':
       return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
         <BlackCar
           position={Store.position[this.props.gameId][this.props.charId]}
           direction={Store.direction[this.props.gameId][this.props.charId]}
         />
       </div>;
     case 'blue-car':
      return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
        <BlueCar
          position={Store.position[this.props.gameId][this.props.charId]}
          direction={Store.direction[this.props.gameId][this.props.charId]}
        />
      </div>;
     case 'orange-car':
       return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
         <OrangeCar
           position={Store.position[this.props.gameId][this.props.charId]}
           direction={Store.direction[this.props.gameId][this.props.charId]}
         />
       </div>;
     case 'white-car':
       return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
         <WhiteCar
           position={Store.position[this.props.gameId][this.props.charId]}
           direction={Store.direction[this.props.gameId][this.props.charId]}
         />
       </div>;
      default:
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Gnome1
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
    }
  }
}
export default observer(Bot);