import React, { Component } from 'react';
import { Sprite } from 'react-game-kit';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import img from '../../commonGameAssets/Plants/plant-states.png';

export default class Plants extends Component {
    static contextTypes = {
        scale: PropTypes.number,
        loop: PropTypes.loop
    };

    constructor(props) {
        super(props);
    }

    getWrapperStyles() {
        return {
          position: 'absolute',
          transform: 'translate(0px, 0px) translateZ(0)',
          transformOrigin: 'top left',
        };
    }
    render() {
        return (
            <div id={'character'} style={this.getWrapperStyles()}>
                <Sprite
                    repeat={true}
                    tileWidth={224}
                    tileHeight={224}
                    src={img}
                    ticksPerFrame={4}
                    state={0}
                    scale={0.4}
                    steps={[0, 0, 0, 0]}
                />
            </div>
        );
    }
}
export default observer(Plants);