import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import config from './config.json';
import React, { Component } from 'react';
import tableResult from './table-result';
import App from '../view/App';
import { observer } from 'mobx-react';
import Store from '../store';

class Tournament extends Component {
    constructor(){
        super();
        
        this.state = {
            presult:"",
            showTable:true,
            gameTitle:''
        }
        if(typeof Store.func === 'string')
            Store.func = eval('('+Store.func+')');
        Object.defineProperty(level3, "name", { value: "Hard bot" });
        Object.defineProperty(level2, "name", { value: "Medium bot" });
        Object.defineProperty(level1, "name", { value: "Easy bot" });
        Object.defineProperty(Store.func, "name", { value: "You" });
    }
    attachClickEvent(){
        var restartGame = document.getElementsByClassName('restartGame');
        for (var i = 0; i < restartGame.length; i++) {
            restartGame[i].onclick= (e)=>{
                Store.player1Func = this.evaluateCode(e.target.attributes[1].value=='level1'||'level2'||'level3'?e.target.attributes[1].value:'custom code');
                Store.player2Func = this.evaluateCode(e.target.attributes[2].value=='level1'||'level2'||'level3'?e.target.attributes[2].value:'custom code');
                this.state.gameTitle = e.target.attributes[1].value+' vs '+ e.target.attributes[2].value;
                Store.showGameSimulation = true;
                Store.needToRestartGame = true;
                console.log("sfd");
            };
        }
    }
    evaluateCode(code){
        switch(code){
            case 'level1':
                return level1;
            case 'level2':
                return level2;
            case 'level3':
                return level3;
            case 'Easy bot':
                return level1;
            case 'Medium bot':
                return level2;
            case 'Hard bot':
                return level3;
            default:
                if(typeof  Store.func == 'string')
                    Store.func = eval('('+Store.func+')')
                Object.defineProperty(Store.func, "name", { value: "You" });
                return Store.func;
        }
    }
    componentWillMount(){
        console.log("ssaa");
        if(typeof Store.func == 'string')
            Store.func = eval("("+Store.func+")");
        var result = tableResult([Store.func,level1,level2,level3], config);
        this.setState({presult : result});
        setTimeout(()=>{
            this.attachClickEvent();
        },1000);
    }
    render() {
        return (
            <div>
                {!Store.showGameSimulation&&<div><div style={{background:'white'}}>
                    {
                        <p dangerouslySetInnerHTML={{__html: this.state.presult}} />
                        
                    }
                </div>
                <div style={{textAlign:'right'}}>
                    <button className="btn-smaller control-btn"  onClick={()=>{
                        if(typeof Store.func == 'string')
                            Store.func = eval("("+Store.func+")");
                        var result = tableResult([Store.func,level1,level2,level3], config);
                        this.setState({presult : result});
                        setTimeout(()=>{
                            this.attachClickEvent();
                        },1000);
                    }}
                    >RESIMULATE</button>
                </div></div>}
                {Store.showGameSimulation&&<div>
                    <div className="gameHeader"><button
                        onClick={()=>{
                            Store.showGameSimulation = false;
                            if(typeof Store.func == 'string')
                                Store.func = eval("("+Store.func+")");
                            var result = tableResult([Store.func,level1,level2,level3], config);
                            this.setState({presult : result});
                            setTimeout(()=>{
                                this.attachClickEvent();
                            },1000);
                        }}
                    >X</button><b>Match: {this.state.gameTitle}</b></div>
                    <App {...this.props} store={Store}/>
                </div>}
            </div>
        );
      }
}
//export default Tournament;
export default observer(Tournament);