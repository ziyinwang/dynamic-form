import React from 'react';
import inputTypes from './inputTypes';

const Input = (props) => {
    const { type, ...otherProps } = props;
    const InputType = inputTypes[type] || inputTypes.default;
    return (
        <InputType {...otherProps} />
    );
};

export default Input;
