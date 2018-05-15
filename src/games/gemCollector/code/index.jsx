import React, { Component } from 'react';

import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import config from '../config.json';
// components
import Character from './components/character';
import Stone from './components/stone';
import Grass from './components/grass';
import Score from './components/score';
import Info from './components/info';
import Controls from './components/controls';
import WinLoseScreen from './components/winLoseScreen';

//import images
import CharacterBlonde from './assets/character-blonde.png';
import CharacterBrunette from './assets/character-brunette.png';

import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.GameStore = this.props.store;
    if (props.player1Function) {
      this.keyListener1 = { status: false };
    } else {
      this.keyListener1 = new KeyListener();
    }
    if (props.player2Function) {
      this.keyListener2 = { status: false };
    } else {
      this.keyListener2 = new KeyListener();
    }
    this.updateHandler = this.updateHandler.bind(this);
  }

  componentDidMount() {
    const player1Keys = this.props.gameConfig.player1Keys;
    if (this.keyListener1 && this.keyListener1.status !== false) {
      this.keyListener1.LEFT = player1Keys.left || config.player1Keys.left;
      this.keyListener1.RIGHT = player1Keys.right || config.player1Keys.right;
      this.keyListener1.UP = player1Keys.up || config.player1Keys.up;
      this.keyListener1.DOWN = player1Keys.down || config.player1Keys.down;
      this.keyListener1.subscribe([
        this.keyListener1.LEFT,
        this.keyListener1.RIGHT,
        this.keyListener1.UP,
        this.keyListener1.DOWN,
      ]);
    }
    const player2Keys = this.props.gameConfig.player2Keys;
    if (this.keyListener2 && this.keyListener2.status !== false) {
      this.keyListener2.LEFT = player2Keys.left || config.player2Keys.left;
      this.keyListener2.RIGHT = player2Keys.right || config.player2Keys.right;
      this.keyListener2.UP = player2Keys.up || config.player2Keys.up;
      this.keyListener2.DOWN = player2Keys.down || config.player2Keys.down;
      this.keyListener2.subscribe([
        this.keyListener2.LEFT,
        this.keyListener2.RIGHT,
        this.keyListener2.UP,
        this.keyListener2.DOWN,
      ]);
    }
    this.props.onGameEvent({
      type: 'ready',
    });
    this.GameStore.score = [0, 0];
    this.GameStore.mode = 'play';
  }

  componentWillUnmount() {
    if (this.keyListener1 && this.keyListener1.status !== false) {
      this.keyListener1.unsubscribe();
    }
    if (this.keyListener2 && this.keyListener2.status !== false) {
      this.keyListener2.unsubscribe();
    }
    this.GameStore.score = [0, 0];
    this.GameStore.mode = 'restart';
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    const GameStore = this.GameStore;
    const { showScore = true, showMode = true, onWin } = this.props;

    return (
      <div style={{ height: '60vh', width: '100%' }}>
        <Loop>
          <Stage className="index-bg-color">
            <World
              onUpdate={this.updateHandler}
              onInit={this.physicsInit}
              onCollision={this.colissionHandler}
              gravity={{
                x: 0,
                y: 0,
                scale: 0.001,
              }}
            >
              <Grass />
              <Character
                key="character1"
                keys={this.keyListener1}
                store={GameStore}
                imgSrc={CharacterBlonde}
                index={0}
                mode={this.props.mode}
              />
              <Character
                key="character2"
                keys={this.keyListener2}
                store={GameStore}
                imgSrc={CharacterBrunette}
                index={1}
                mode={this.props.mode}
              />
              {GameStore.stonesData.map((stone, index) => {
                return (
                  <Stone
                    key={index}
                    store={GameStore}
                    mode={this.props.mode}
                    index={index}
                    onGameEvent={this.props.onGameEvent}
                  />
                );
              })}
              {showScore && <Score store={GameStore} left={'0'} right={'none'} playerId={0} />}
              {showScore && <Score store={GameStore} left={'none'} right={'0'} playerId={1} />}
              {showMode && <Info mode={this.props.mode} />}
              <Controls store={GameStore} onGameEvent={this.props.onGameEvent} />
              <WinLoseScreen store={GameStore} onWin={winner => onWin(winner)} onGameEvent={this.props.onGameEvent} />
            </World>
          </Stage>
        </Loop>
      </div>
    );
  }
  physicsInit(engine) {}
  colissionHandler(engine) {}
  updateHandler(engine) {
    const GameStore = this.GameStore;
    let player1Direction;
    let player2Direction;
    if (GameStore.mode === 'pause') return;
    let WorldData = {
      players: GameStore.characterPosition,
      stones: GameStore.stonesData,
    };
    if (this.props.player1Function) player1Direction = this.props.player1Function(WorldData);
    if (this.props.player2Function) player2Direction = this.props.player2Function(WorldData);
    if (player1Direction) {
      if (player1Direction.left) GameStore.characterState[0] = 9;
      else if (player1Direction.right) GameStore.characterState[0] = 11;
      else if (player1Direction.up) GameStore.characterState[0] = 8;
      else if (player1Direction.down) GameStore.characterState[0] = 10;
    }
    if (player2Direction) {
      if (player2Direction.left) GameStore.characterState[1] = 9;
      else if (player2Direction.right) GameStore.characterState[1] = 11;
      else if (player2Direction.up) GameStore.characterState[1] = 8;
      else if (player2Direction.down) GameStore.characterState[1] = 10;
    }
    GameStore.createNewStones();
  }
}

Game.propTypes = {
  showScore: PropTypes.bool,
  showMode: PropTypes.bool,
  onScoreUpdate: PropTypes.func,
  store: PropTypes.objectOf(Object),
  gameConfig: PropTypes.objectOf(Object),
};

Game.defaultProps = {
  gameConfig: config,
};

export default observer(Game);
