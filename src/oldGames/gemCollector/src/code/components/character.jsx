import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Body } from 'react-game-kit';
import Sprite from './Sprite.js';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

class Character extends Component {
  static propTypes = {
    store: PropTypes.object,
    imgSrc: PropTypes.string,
    index: PropTypes.number,
    keys: PropTypes.object,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props, context) {
    super(props);
    this.x = 0;
    this.y = 0;
    this.controlChractors = this.controlChractors.bind(this);
    this.update = this.update.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    //this.changeCharacterState = this.changeCharacterState.bind(this);
    this.state = {
      characterState: 11,
      ticksPerFrame: 4,
    };
    if (this.props.keys) this.charPhysicSize = 64;
    else this.charPhysicSize = 12;
  }
  controlChractors() {
    this.x = this.props.store.characterPosition[this.props.index].x;
    this.y = this.props.store.characterPosition[this.props.index].y;
  }
  update = () => {
    if (this.props.store.mode === 'restart') {
      this.props.store.characterPosition = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
      this.props.store.characterState = [11, 10];
      this.body1.body.position = this.props.store.characterPosition[this.props.index];
      this.props.store.stonesData = [];
      return;
    }
    let x = this.props.store.characterPosition[this.props.index].x;
    let y = this.props.store.characterPosition[this.props.index].y;
    if (this.props.keys && this.props.keys.status !== false) {
      let newState;
      if (this.props.keys.isDown(this.props.keys.RIGHT)) newState = 11;
      else if (this.props.keys.isDown(this.props.keys.LEFT)) newState = 9;
      else if (this.props.keys.isDown(this.props.keys.UP)) newState = 8;
      else if (this.props.keys.isDown(this.props.keys.DOWN)) newState = 10;
      if (newState) this.props.store.characterState[this.props.index] = newState;
    }
    this.setState((prevState, props) => {
      if (prevState.characterState !== this.props.store.characterState[this.props.index])
        return {
          characterState: this.props.store.characterState[this.props.index],
        };
      else return { characterState: prevState.characterState };
    });
    if (this.props.store.mode === 'pause') Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
    else if (this.state.characterState === 8) this.moveUp();
    else if (this.state.characterState === 9) this.moveLeft();
    else if (this.state.characterState === 10) this.moveDown();
    else if (this.state.characterState === 11) this.moveRight();
  };

  moveRight() {
    const position = this.props.store.characterPosition[this.props.index];
    if (this.props.store.checkIfObjectInsideTheScreen(this.props.index, 'right', this.props.mode))
      Matter.Body.setVelocity(this.body1.body, {
        x: this.props.store.config.speed,
        y: 0,
      });
    else Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
    this.props.store.characterPosition[this.props.index] = this.body1.body.position;
  }

  moveLeft() {
    const position = this.props.store.characterPosition[this.props.index];
    if (this.props.store.checkIfObjectInsideTheScreen(this.props.index, 'left', this.props.mode))
      Matter.Body.setVelocity(this.body1.body, {
        x: -this.props.store.config.speed,
        y: 0,
      });
    else Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
    this.props.store.characterPosition[this.props.index] = this.body1.body.position;
  }

  moveUp() {
    const position = this.props.store.characterPosition[this.props.index];
    if (this.props.store.checkIfObjectInsideTheScreen(this.props.index, 'top', this.props.mode))
      Matter.Body.setVelocity(this.body1.body, {
        x: 0,
        y: -this.props.store.config.speed,
      });
    else Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
    this.props.store.characterPosition[this.props.index] = this.body1.body.position;
  }

  moveDown() {
    const position = this.props.store.characterPosition[this.props.index];
    if (this.props.store.checkIfObjectInsideTheScreen(this.props.index, 'bottom', this.props.mode))
      Matter.Body.setVelocity(this.body1.body, {
        x: 0,
        y: this.props.store.config.speed,
      });
    else Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
    this.props.store.characterPosition[this.props.index] = this.body1.body.position;
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }
  componentWillReceiveProps() {
    this.controlChractors();
  }
  render() {
    this.controlChractors();
    return (
      <div
        id={`character-${this.props.index}-${this.props.mode}`}
        style={{
          position: 'absolute',
          transform: `translate(${this.x * this.context.scale}px, ${this.y * this.context.scale}px) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <Body
          args={[
            this.props.store.characterPosition[this.props.index].x,
            this.props.store.characterPosition[this.props.index].y,
            this.charPhysicSize,
            this.charPhysicSize,
          ]}
          inertia={Infinity}
          customId={this.props.index}
          label={'character'}
          ref={b => {
            this.body1 = b;
          }}
        >
          <Sprite
            repeat={true}
            tileWidth={64}
            tileHeight={64}
            src={this.props.imgSrc}
            scale={this.context.scale * 2}
            ticksPerFrame={this.state.ticksPerFrame}
            state={this.state.characterState}
            steps={[6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 5, 5, 5, 5, 12, 12, 12, 12, 5]}
          />
        </Body>
      </div>
    );
  }
}
export default observer(Character);
