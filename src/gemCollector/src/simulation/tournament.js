import React, { Component } from 'react';
let tournamentSimulate = require('./test');

class Tournament extends Component {
    constructor(){
        super();
        this.state = {
            presult:"",
            showTable:true
        }
    }
    render() {
        return (
            <div>
                <button style={{marginLeft:"40%"}} onClick={()=>{
                    tournamentSimulate.default().then((result)=>{
                        this.setState({presult : result, showTable: true});
                    });
                }}>Run tournament</button>
                <button onClick={()=>{
                    this.setState({showTable : !this.state.showTable});
                }}>{this.state.showTable?"Hide tournament":"Show tournament"}</button>
                {
                    this.state.showTable&&<p dangerouslySetInnerHTML={{__html: this.state.presult}} />
                }
            </div>
        );
      }
}
export default Tournament;