import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Store from './store/squad';
let tournamentSimulate = require('../simulation/test');

class Tournament extends Component {
    render() {
        return (
            <div>
                <button style={{marginLeft:"40%"}} onClick={()=>{
                    tournamentSimulate.default().then((result)=>{
                        Store.tournamentResult = result;
                    });
                    Store.showTournament = true;
                }}>Run tournament</button>
                <button onClick={()=>{
                    Store.showTournament = false;
                }}>Hide tournament</button>
                {
                    Store.showTournament&&
                    <p dangerouslySetInnerHTML={{__html: Store.tournamentResult}} />
                }
            </div>
        );
      }
}
export default observer(Tournament);