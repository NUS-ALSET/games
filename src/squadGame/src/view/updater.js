import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Simulation from '../simulation/simulation';
import config from '../simulation/config.json';
import WinningScreen from './WinningScreen';
import ScoreDisplay from './ScoreDisplay';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';

class Updater extends Component {
    static contextTypes = {
        loop: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.props.store.player1Func = this.props.bot1;
        this.props.store.player2Func = this.props.bot2;
        this.props.store.botsQuantity = this.props.botsQuant;
        this.props.store.time = this.props.time;
        this.simulation = new Simulation(config,this.props.store.player1Func,this.props.store.player2Func,this.props.botsQuant);
        this.changeBotsQuantity = this.changeBotsQuantity.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }
    componentDidUpdate(){
        if(this.props.store.botsQuantity!==this.props.botsQuant)
            this.changeBotsQuantity();
        //console.log(this.props)
        if(this.props.pause)
            this.props.store.mode = 'pause';
        else{
            this.props.store.mode = 'play';
        }
        if(this.props.restart)
            this.restartGame();
    }
    changeBotsQuantity(){
        this.props.store.mode = 'pause';
        this.props.store.botsQuantity = this.props.botsQuant;
        this.restartGame();
    }
    restartGame(){
        this.props.store.time = this.props.time;
        this.simulation = new Simulation(config,this.props.store.player1Func,this.props.store.player2Func,this.props.store.botsQuantity);
        this.props.store.mode = 'play';
    }
    loop = () => {
        if(this.props.store.mode == 'play'){
            if(this.props.store.time<=0){
                this.props.store.mode = 'pause'
            }
            if(Math.abs(this.props.store.prevTime - Date.now())>=1000){
                this.props.store.time --;
                this.props.store.prevTime = Date.now();
            }
            var data = this.simulation.simulate();
            var gamesQount = 2;
            var charQount = data.bots[0].length;
            for(var i=0;i<gamesQount;i++){
                this.props.store.updateCollectives(i, data.collectives[i]);
                this.props.store.updateScore(i, data.score[i]);
                for(var j=0;j<charQount;j++){
                    this.props.store.updatePosition(i, j, data.bots[i][j], 1);
                    this.props.store.updateDirection(i, j, data.direction[i][j]);
                }
            }
            //document.getElementById("timeHolder").innerHTML = "Time left: "+this.props.store.time;
        }
        if(this.props.store.needToRestartGame){
            var el1 = document.getElementById("player1Select");
            var val1 = el1.options[el1.selectedIndex].value;
            var el2 = document.getElementById("player2Select");
            var val2 = el2.options[el2.selectedIndex].value;
            this.setPlayer(val1,1);
            this.setPlayer(val2,2);
            this.restartGame();
            this.props.store.needToRestartGame = false;
        }
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        return (<div></div>)
    }
}

export default observer(Updater);