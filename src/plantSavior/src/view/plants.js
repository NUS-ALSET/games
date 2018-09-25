import React, { Component } from 'react';
import Plant from './plant.js';
import { observer } from 'mobx-react';
import Store from '../store';

class Plants extends Component {
    constructor() {
        super();
    }
    render(){
        return <div>{this.props.store['plants'+(this.props.gameId+1)].map((plant, index) => {
            return <Plant key={index} gameId={this.props.gameId} plant={plant}></Plant>
        })}</div>;
    }
}
export default observer(Plants);