import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyListener } from 'react-game-kit';
import Drone1 from '../commonComponents/Characters/Drone1';
import Drone2 from '../commonComponents/Characters/Drone2';
import Drone3 from '../commonComponents/Characters/Drone3';
import Store from './store/plantSavior';
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
    this.getPlant = this.getPlant.bind(this);
    this.getWater = this.getWater.bind(this);
    this.getPests = this.getPests.bind(this);
  }
  loop = () => {
    if (!document.getElementById('bt' + this.props.charId + '-' + this.props.gameId))
      return;
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId).childNodes[0];
    var parentEl = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId).parentElement;
    var direction = Store.direction[this.props.gameId][this.props.charId];
    if (Store.mode == 'play') {
      if (Util.rect2parent(player, parentEl, direction))
        Store.moveCharacter(this.props.gameId, this.props.charId);
      var world = {
        player: Store.position[this.props.gameId][this.props.charId],
        isFilledWithWater: Store.filled[this.props.gameId][this.props.charId]==1,
        isFilledWithPests: Store.filled[this.props.gameId][this.props.charId]==2,
        driedPlants: Store.plants[this.props.gameId].filter(function(plant){
          return plant.state==2;
        }),
        pestedPlants: Store.plants[this.props.gameId].filter(function(plant){
          return plant.state==1;
        }),
        sickPlants: [
          ...Store.plants[this.props.gameId].filter(function(plant){
            return plant.state==2;
          }),
          ...Store.plants[this.props.gameId].filter(function(plant){
            return plant.state==1;
          })
        ],
        water: {x:0,y:0,width:100,height:150},
        factory: {x:200,y:0,width:100,height:100},
      };
      if (this.props.showCodeEditor) {
        try {
          var setDirection = eval('(function(world){' + Store.func + '}(world))');
        }
        catch (err) {
          var setDirection = { down: true };
          if (this.props.onError)
            this.props.onError(err);
        }
      }
      else if (this.props.player1Function)
        var setDirection = this.props.player1Function(world);
      else if (this.props.player2Function)
        var setDirection = this.props.player2Function(world);
      else
        var setDirection = this.props.getCommands(world);
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
    }
    this.getPlant();
    this.getWater();
    this.getPests();
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.gameId, this.props.charId);
    }
  }
  getPlant() {
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
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
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var water = parentEl.getElementsByClassName('water');
    if (Util.rect2Rect(water[0], player)&&Store.filled[this.props.gameId][this.props.charId] != 1) {
      console.log('get water');
      Store.filled[this.props.gameId][this.props.charId] = 1;
    }
  }
  getPests(){
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
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
    console.log('unmounting');
    this.context.loop.unsubscribe(this.loopID);
  }
  render() {
    switch (this.props.type) {
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
      default:
        return <div id={'bt' + this.props.charId + '-' + this.props.gameId}>
          <Drone3
            position={Store.position[this.props.gameId][this.props.charId]}
            direction={Store.direction[this.props.gameId][this.props.charId]}
          />
        </div>;
    }
  }
}
export default observer(Bot);