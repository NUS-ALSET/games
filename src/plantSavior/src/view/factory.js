import React, { Component } from 'react';
import img from '../assets/images/factory.png';
import config from '../simulation/config.json';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Factory extends Component {
    static contextTypes = {
        scale: PropTypes.number
    };
    constructor() {
        super();
    }
    render(){
        return <div
            style={{
                position: 'absolute',
                transform: 'translate(' + config.factoryPosition.x*this.context.scale + 'px, ' + config.factoryPosition.y*this.context.scale + 'px) translateZ(0)',
                transformOrigin: 'top left',
                width: config.factorySize*this.context.scale,
                height: config.factorySize*this.context.scale,
            }}
        >
            <img
                style={{ 'width': '100%', 'height': '100%' }}
                src={img}
            />
        </div>;
    }
}

export default observer(Factory);