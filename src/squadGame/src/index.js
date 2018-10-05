import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './view/App.js';
import Tournament from './simulation/tournament';
import Store from './store';
import level1 from './simulation/level1';
import level2 from './simulation/level2';
import level3 from './simulation/level3';
import control from './simulation/control';

class TournamentWithUi extends Component {
    constructor(){
        super();
        this.state = {
            startTournament : true,
            startCustomTournament: false,
            levels:[level1,level2,level3],
            showTournament:true
        };
        Object.defineProperty(level1, "name", { value: "level1" });
        Object.defineProperty(level2, "name", { value: "level2" });
        Object.defineProperty(level3, "name", { value: "level3" });
    }
    render() {
        return (<div>
                {this.state.showTournament&&<div style={{position:'absolute', zIndex:100, left:'50%', transform:'translate(-50%, 0%)', top:'60px'}}>
                    <Tournament
                        startTournament={this.state.startTournament} 
                        startCustomTournament={this.state.startCustomTournament}
                        levels={this.state.levels}
                    ></Tournament>
                </div>}
                <div style={{position:'absolute', zIndex:100, left:'50%', transform:'translate(-50%, 0%)', top:'45px'}}>
                    <button
                        className = "control-btn active"
                        onClick={()=>{
                            this.setState({
                                startTournament:false, 
                                startCustomTournament:false,
                                levels:[level1,level2,level3],
                                showTournament:true
                            });
                            setTimeout(()=>{this.setState({
                                startTournament:true, 
                                startCustomTournament:false,
                                levels:[level1,level2,level3],
                                showTournament:true
                            })},10);
                        }}
                    >
                        Run tournament
                    </button>
                    <button
                        className = "control-btn active"
                        onClick={()=>{
                            if(typeof Store.func == 'string')
                                Store.func = eval("("+Store.func+")");
                            this.setState({
                                startTournament:false, 
                                startCustomTournament:false,
                                levels:[level1,level2,level3, Store.func],
                                showTournament:true
                            });
                            setTimeout(()=>{this.setState({
                                startTournament:true, 
                                startCustomTournament:false,
                                levels:[level1,level2,level3, Store.func],
                                showTournament:true
                            })},10)
                        }}
                    >
                        Run custom tournament
                    </button>
                    <button
                        onClick={()=>{this.setState({
                            showTournament:false
                        })}}
                    >X</button>
            </div></div>)
    }
}
class GameWithUi extends Component {
    constructor(){
        super();
        this.state = {
            game1Bot:level3,
            game2Bot:control,
            game1BotName:'level3',
            game2BotName:'manual',
            botsQuantity:2,
            restart:false,
            pause:false
        };
        this.changeQuantity = this.changeQuantity.bind(this);
        this.changePlayer1Func = this.changePlayer1Func.bind(this);
    }
    changeQuantity(e){
        this.setState({botsQuantity: parseInt(e.target.value)});
    }
    changePlayer1Func(e){
        this.setState({game1BotName: e.target.value});
    }
    render() {
        return (
            <div>
                <p style={{position:'absolute', left:0, top:0, margin:0, zIndex:100}}>
                    <select id={"player1Select"} value={this.state.game1BotName} onChange={this.changePlayer1Func}>
                        <option value={"custom"}>Custom code</option>
                        <option value={"manual"}>Manual control</option>
                        <option value={"level1"}>Level 1</option>
                        <option value={"level2"}>Level 2</option>
                        <option value={"level3"}>Level 3</option>
                    </select>
                </p>
                <p style={{position:'absolute', left:'50%', top:'15px', transform:'translate(-50%, -50%)', zIndex:100}}>
                    <button onClick={() => {
                        this.setState({restart:true});
                        setTimeout(()=>{
                            this.setState({restart:false,pause:false})
                        },10);
                    }}>Restart</button>
                    <button onClick={() => {this.setState({pause:!this.state.pause});}}>{this.state.pause? 'Resume':'Pause'}</button>
                    <select onChange={this.changeQuantity} value={this.state.botsQuantity}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </p>
                <App 
                    restart={this.state.restart}
                    pause={this.state.pause}
                    bot1={this.state.game1Bot} 
                    bot2={this.state.game2Bot}
                    botsQuant={this.state.botsQuantity}
                    time={120}>
                </App>
            </div>
        );
    }
}

ReactDOM.render(<TournamentWithUi></TournamentWithUi>, document.getElementById('simulation'));
ReactDOM.render(<GameWithUi></GameWithUi>, document.getElementById('root'));


// style={{position:'absolute', zIndex:100, left:'50%', transform:'translate(-50%, 0%)', top:'45px'}}