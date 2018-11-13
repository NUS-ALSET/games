import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import BlueCar from './CarBlue';
import WhiteCar from './CarWhite';
import GreenCar from './CarGreen';

const CharacterStore = props => {
    console.log('character', props.character)
    switch(props.character) {
        case 'GreenCar' :
            return (
                <GreenCar {...props} />
            );
        case 'WhiteCar' :
            return (
                <WhiteCar {...props} />
            );
        default :
            return (
                <BlueCar {...props} />
            );
    }
};

export default observer(CharacterStore);