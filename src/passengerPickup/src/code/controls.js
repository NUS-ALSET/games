import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from './store/passengerPickup';
import { observer } from 'mobx-react';
import icon from './localAsset/passenger_icon.png';

class Controls extends Component {
  static contextTypes = {
    loop: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.pauseResumeGame = this.pauseResumeGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.loop = this.loop.bind(this);
    this.startCountDown();
  }
  loop() {
    if (Store.time == 0 && Store.mode != 'restart' && Store.mode != 'pause') {
      Store.mode = 'pause';
      if (this.props.onEnd) {
        var player = Store.score[0] > Store.score[1] ? 'player1' : 'player2';
        this.props.onEnd(player);
      }
    }
  }
  startCountDown() {
    setInterval(() => {
      if (Store.mode == 'play' && Store.time > 0)
        Store.time--;
    }, 1000);
  }
  pauseResumeGame() {
    if (Store.mode == 'pause') {
      Store.mode = 'play';
      if (this.props.onPlay) {
        this.props.onPlay();
      }
    }
    else {
      Store.mode = 'pause';
      if (this.props.onPause) {
        this.props.onPause();
      }
    }
  }

  restartGame() {
    Store.mode = 'restart';
    setTimeout(() => {
      Store.mode = 'play';
      if (this.props.onPlay)
        this.props.onPlay();
    }, 1000);
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left',
    };
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }
  getRows(gameId, carId, floatDirection){
    var car=[];
    for(var i=0;i<Store.freePlaces[gameId][carId];i++){
      car.push('car');
    }
    return car.map((row, index) =><div style={{
      backgroundImage: 'url('+icon+')',
      backgroundSize:'contain',
      backgroundColor:'#9cff9ac2',
      width:'20px',
      height:'20px',
      float:floatDirection,
      borderRadius:'5px',
      margin:'2px'
    }} key={index}></div>);
  }
  render() {
    var car1=[];
    for(var i=0;i<Store.freePlaces[0][0];i++){
      car1.push(<div>+</div>);
    }
    return <div>
      {Store.time == 0 && <div style={{
        position: 'absolute',
        background: '#7eca84',
        width: '100%',
        height: '100%',
        zIndex: 2
      }}>
        <h1 style={{
          marginTop: '30%',
          textAlign: 'center',
          color: '#fff'
        }}>{Store.score[0] > Store.score[1] ? 'Player 1 Win!!!' : 'Player 2 Win!!!'}</h1>
        <button onClick={() => this.restartGame()}
          style={{
            width: '30%',
            marginLeft: '35%',
            height: '40px',
            background: '#7eca84',
            border: '3px solid #fff',
            fontSize: '19px',
            textTransform: 'uppercase',
            color: '#fff',
            lineHeight: '36px'
          }}
        >Restart</button>
      </div>}
      <h3 style={{ position: 'fixed', left: 0, top: '12px', zIndex: 1 }}>Player 1 score: {Store.score[0]}</h3>
      <h4 style={{ position: 'fixed', left: 0, top: '32px', zIndex: 1 }}>Car 1: <div>{this.getRows(0, 0, 'left')}</div></h4>
      <h4 style={{ position: 'fixed', left: '110px', top: '32px', zIndex: 1 }}>Car 2: <div>{this.getRows(0, 1, 'left')}</div></h4>

      <h3 style={{ position: 'fixed', right: 0, top: '12px', zIndex: 1 }}>Player 2 score: {Store.score[1]}</h3>
      <h4 style={{ position: 'fixed', right: 0, top: '32px', zIndex: 1 }}>Car 1: <div>{this.getRows(1, 0, 'right')}</div></h4>
      <h4 style={{ position: 'fixed', right: '110px', top: '32px', zIndex: 1 }}>Car 2: <div>{this.getRows(1, 1, 'right')}</div></h4>

      <h3 style={{ position: 'fixed', left: '45%', top: 0 }}>Time left: {Store.time}</h3>
      <button style={{ position: 'fixed', left: 0, top: 0, zIndex: 1 }} onClick={() => this.restartGame()}>Restart</button>
      <button style={{ position: 'fixed', left: '70px', top: 0, zIndex: 1 }} onClick={() => this.pauseResumeGame()}>{Store.mode == 'play' ? 'Pause' : 'Resume'}</button>
    </div>;
  }
}
export default observer(Controls);