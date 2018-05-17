import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
let tournamentSimulate = require('../../simulation/test');

class Tournament extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>{
                    tournamentSimulate.default().then((result)=>{
                        this.props.store.tournamentResult = result;
                    });
                    this.props.store.showTournament = true;
                }}>Run tournament</button>
                <button onClick={()=>{
                    this.props.store.showTournament = false;
                }}>Hide tournament</button>
                {
                    this.props.store.showTournament&&
                    <p dangerouslySetInnerHTML={{__html: this.props.store.tournamentResult}} />
                }
            </div>
        );
      }
}
export default observer(Tournament);