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
import Store from './store/squad';
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
        collectives: Store.collectives[this.props.gameId]
      };
      if (this.props.showCodeEditor) {
        let None = null;
        try {
          var direction = {left : false, right : false, up : false, down : false};
          eval (Store.func);
          direction[(window.result || '').toLowerCase()]=true;
          var setDirection=direction;
        }
        catch (err) {
         console.log(err,Store.func);
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
    this.getCollectives();
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.gameId, this.props.charId);
    }
  }
  getCollectives() {
    var player = document.getElementById('bt' + this.props.charId + '-' + this.props.gameId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var collectives = parentEl.getElementsByClassName('collective');
    Array.from(collectives).forEach(collective => {
      if (Util.rect2Rect(collective, player)) {
        var collectiveId = collective.getAttribute('data-key');
        Store.removeCollective(this.props.gameId, collectiveId);
      }
    });
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