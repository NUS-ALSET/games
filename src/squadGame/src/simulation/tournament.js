import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import config from './config.json';
import React, { Component } from 'react';
import tableResult from './table-result';
import { observer } from 'mobx-react';

class Tournament extends Component {
    constructor(){
        super();
        this.state = {
            presult:""
        }
    }
    attachClickEvent(){
        var restartGame = document.getElementsByClassName('restartGame');
        for (var i = 0; i < restartGame.length; i++) {
            restartGame[i].onclick= (e)=>{
                //console.log(e.target.attributes[1].value, e.target.attributes[2].value)
                this.props.store.player1ControlSelected = e.target.attributes[1].value=='level1'||'level2'||'level3'?e.target.attributes[1].value:'custom code';
                this.props.store.player2ControlSelected = e.target.attributes[2].value=='level1'||'level2'||'level3'?e.target.attributes[2].value:'custom code';
                this.props.store.needToRestartGame = true;
            };
        }
    }
    componentWillUpdate(){
        if(!this.props.startTournament){
            var result = tableResult(this.props.levels, config);
            this.setState({presult : result});
            setTimeout(()=>{
                this.attachClickEvent();
            },1000);
            //console.log("test");
        }
    }
    render() {
        return (
            <div style={{background:'white'}}>
                {
                    <p dangerouslySetInnerHTML={{__html: this.state.presult}} />
                }
            </div>
        );
      }
}
//export default Tournament;
export default observer(Tournament);