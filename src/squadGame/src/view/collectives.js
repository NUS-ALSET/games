import React, { Component } from 'react';
import img from '../assets/collective/trash1.png';
import squadConfig from '../simulation/config.json';
import PropTypes from 'prop-types';
import Collective from './collective';
import { observer } from 'mobx-react';

class Collectives extends Component {
    constructor() {
        super();
    }
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render(){
        return <div>{this.props.store['collectives'+(this.props.gameId+1)].map((collective, index) => {
            return <Collective key={collective.id} collective={collective}></Collective>;
        })}</div>;
    }
}
export default observer(Collectives);