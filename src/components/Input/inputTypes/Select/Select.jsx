import React from 'react';

const Select = (props) => {
    const { name, ...otherProps } = props;
    const { options } = otherProps;
    return (
        <select>
            {options.map((option, index) => (
                <option
                    key={index}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
