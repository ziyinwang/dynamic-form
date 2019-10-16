import React from 'react';
import styles from './Select.module.css';

const Select = (props) => {
    const { name, value, changeHandler, options } = props;
    return (
        <select
            className={styles.select}
            value={value || "placeholder"}
            onChange={(e) => changeHandler({
                name,
                value: e.target.value,
            })}
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
