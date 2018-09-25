import React, { Component } from 'react';
import Sprite from './Components/Characters/Sprite';
import img from '../assets/sprites/plant-states.png';
import config from '../simulation/config.json';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
class Plant extends Component {
    static contextTypes = {
        scale: PropTypes.number
    };
    constructor() {
        super();
    }
    getWrapperStyles(x,y, state) {
        var targetX = x*this.context.scale;
        var targetY = y*this.context.scale;
        return {
            position: 'absolute',
            transform: `translate(${targetX}px, ${targetY}px)`,
            transformOrigin: 'left top',
            width:'200px',
            height:'200px'
        };
    }
    getHealthBarStyles(){
        return {
            marginTop: -10*this.context.scale+"px",
            height: 5*this.context.scale+"px",
            width: (config.plantSize-2)*this.context.scale+"px",
            background: "red"
        }
    }
    getHealthQuantityStyles(health){
        return {
            height: "100%",
            width: health+"%",
            background: "green"
        }
    }
    getsRightState(state){
        if(state == 1)
            return 2;
        else if(state == 2)
            return 1;
        else
            return state;
    }
    render(){
        return <div style={this.getWrapperStyles(this.props.plant.x, this.props.plant.y, this.props.plant.state)}>
                <div style={this.getHealthBarStyles()} className={"health-bar"}>
                    <div style={this.getHealthQuantityStyles(this.props.plant.health)} className={"health-quantity"}></div>
                </div>
                <Sprite
                    repeat={true}
                    tileWidth={200}
                    tileHeight={200}
                    src={img}
                    ticksPerFrame={4}
                    state={this.getsRightState(this.props.plant.state)}
                    scale={(config.plantSize/200)*this.context.scale}
                    steps={[0, 0, 0, 0]}
                />
            </div>
    }
}

export default observer(Plant);