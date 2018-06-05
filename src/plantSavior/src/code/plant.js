import React, { Component } from 'react';
import { Sprite } from 'react-game-kit';
import { observer } from 'mobx-react';
import waterSprite from '../commonGameAssets/Sprites/spilled-water-sprite.png';
import pesticide from '../commonGameAssets/Sprites/spilled-pesticide-sprite.png';
import img from '../commonGameAssets/Plants/plant-states.png';
import Store from './store/plantSavior';
import PropTypes from 'prop-types';

class Plant extends Component {
    static contextTypes = {
        loop: PropTypes.object,
        scale: PropTypes.number,
    };
    constructor() {
        super();
    }
    loop = () => {
        Store.generatePlants(this.props.gameId);
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    getWrapperStyles(targetX, targetY) {
        return {
            position: 'absolute',
            transform: `translate(${targetX}px, ${targetY}px)`,
            transformOrigin: 'left top',
            width: '64px',
            height: '64px'
        };
    }
    render() {
        return (
            <div>{Store.plants[this.props.gameId].map((plantData, index) => {
                return <div className={plantData.state==0||plantData.state==3?"plant":"deseased-plant"} data-key={index} key={index} style={this.getWrapperStyles(plantData.x, plantData.y)}>
                    {plantData.state!==0&&plantData.state!==3&&<div style={{
                        width: '95px',
                        height: '5px',
                        background: '#ff0000',
                        position: 'absolute'
                    }}>
                        <div style={{
                            width: plantData.life+'px',
                            height: '5px',
                            background: '#00ff00',
                            position: 'absolute'
                        }}></div>
                    </div>}
                    <Sprite
                        repeat={false}
                        tileWidth={200}
                        tileHeight={200}
                        src={img}
                        ticksPerFrame={1}
                        state={plantData.state}
                        steps={[0, 0, 0, 0]}
                        scale={0.5}
                    />
                </div>;
              })}</div>
        );
    }
}
export default observer(Plant);