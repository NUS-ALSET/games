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
import Store from './store/gemCollector';
import Util from '../commonFuncs/index';
import { observer } from 'mobx-react';

class Character extends Component {
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
    if (!document.getElementById('bt' + this.props.charId))
      return;
    var player = document.getElementById('bt' + this.props.charId).childNodes[0];
    var parentEl = document.getElementById('bt' + this.props.charId).parentElement;
    var direction = Store.direction[this.props.charId];
    if (Store.mode == 'play') {
      if (Util.rect2parent(player, parentEl, direction))
        Store.moveCharacter(this.props.charId);
      var world = {
        player: Store.position[this.props.charId],
        collectives: Store.collectives
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
          Store.changeDirection(this.props.charId, 'left');
        else if (setDirection.right)
          Store.changeDirection(this.props.charId, 'right');
        else if (setDirection.up)
          Store.changeDirection(this.props.charId, 'up');
        else if (setDirection.down)
          Store.changeDirection(this.props.charId, 'down');
      }
    }
    this.getCollectives();
    if (Store.mode == 'restart') {
      Store.restartCharacter(this.props.charId);
    }
  }
  getCollectives() {
    var player = document.getElementById('bt' + this.props.charId);
    var parentEl = player.parentElement;
    player = player.childNodes[0];
    var collectives = parentEl.getElementsByClassName('collective');
    Array.from(collectives).forEach(collective => {
      if (Util.rect2Rect(collective, player)) {
        var collectiveId = collective.getAttribute('data-key');
        Store.removeCollective(this.props.charId, collectiveId);
      }
    });
  }
  componentDidMount() {
    this.loopID2 = this.context.loop.subscribe(this.loop);
  }
  componentWillUnmount() {
    console.log('unmounting');
    this.context.loop.unsubscribe(this.loopID);
  }
  render() {
    switch (this.props.type) {
      case 'gnome1':
        return <div id={'bt' + this.props.charId}>
          <Gnome1
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'gnome2':
        return <div id={'bt' + this.props.charId}>
          <Gnome2
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'blonde':
        return <div id={'bt' + this.props.charId}>
          <Blonde
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'brunette':
        return <div id={'bt' + this.props.charId}>
          <Brunette
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'drone1':
        return <div id={'bt' + this.props.charId}>
          <Drone1
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'drone2':
        return <div id={'bt' + this.props.charId}>
          <Drone2
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      case 'drone3':
        return <div id={'bt' + this.props.charId}>
          <Drone3
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
      default:
        return <div id={'bt' + this.props.charId}>
          <Gnome1
            position={Store.position[this.props.charId]}
            direction={Store.direction[this.props.charId]}
          />
        </div>;
    }
  }
}
export default observer(Character);