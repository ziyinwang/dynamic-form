import React from 'react';

const Checkbox = (props) => {
    const { name, value, changeHandler } = props;
    return (
        <input
            type="checkbox"
            checked={value ? true : false}
            onChange={(e) => changeHandler({
                name,
                value: e.target.checked,
            })}
        />
    );
};

export default Checkbox;
