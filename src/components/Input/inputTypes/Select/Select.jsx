import React from 'react';

const Select = (props) => {
    const { name, value, changeHandler, options } = props;
    return (
        <select
            value={value || "placeholder"}
            onChange={(e) => changeHandler(name, e.target.value)}
        >
            <option value="placeholder" disabled>- Select -</option>
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
