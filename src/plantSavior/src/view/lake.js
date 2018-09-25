import React, { Component } from 'react';
import img from '../assets/tiles/water-tile.jpg';
import config from '../simulation/config.json';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Lake extends Component {
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
                transform: 'translate(' + config.lakePosition.x*this.context.scale + 'px, ' + config.lakePosition.y*this.context.scale + 'px) translateZ(0)',
                transformOrigin: 'top left',
                width: config.lakeSize*this.context.scale,
                height: config.lakeSize*this.context.scale,
                borderBottomLeftRadius: config.lakeSize/10+"px",
                borderBottomRightRadius: config.lakeSize/10+"px",
                overflow: "hidden"
            }}
        >
            <img
                style={{ 'width': '100%', 'height': '100%' }}
                src={img}
            />
        </div>;
    }
}

export default observer(Lake);