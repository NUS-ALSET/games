import React, { Fragment, Component } from 'react';
import App from './view/App.js';
import Tournament from './simulation/tournament';
import Store from './store';
import level1 from './simulation/level1';
import level2 from './simulation/level2';
import level3 from './simulation/level3';
import control from './simulation/control';
import CodeEditor from './view/code-editor.js';

class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            levels:[]
        }
        Object.defineProperty(level1, "name", { value: "level1" });
        Object.defineProperty(level2, "name", { value: "level2" });
        Object.defineProperty(level3, "name", { value: "level3" });
        this.getFunctionsFromText = this.getFunctionsFromText.bind(this);
        this.getFunctionsFromText();
    }
    getFunctionsFromText(){
        //parsing function to make text of function actual function
        if(this.props.levels&&this.props.levels.length>0){
            for(var i=0;i<this.props.levels.length;i++){
                if(this.props.levels[i].pyCode&&this.props.levels[i].pyCode!==''){
                    var level = window.createFunctionFromPython(this.props.levels[i].pyCode);
                }
                else if(this.props.levels[i].jsCode&&this.props.levels[i].jsCode!==''){
                    if(typeof this.props.levels[i].jsCode == 'function')
                        var level = this.props.levels[i].jsCode;
                    else
                        var level = eval("("+this.state.jsCode+")");
                }
                else if(typeof this.props.levels[i] == 'function'){
                    var level = this.props.levels[i];
                }
            }
        }
    }
    render(){
        return <Fragment>
            {this.props.gameType=='TOURNAMENT'&&<Tournament 

            />}
            <App 
            
            />
        </Fragment>
    }
}