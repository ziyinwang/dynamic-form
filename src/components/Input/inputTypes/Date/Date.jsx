import React from 'react';
import { Fragment } from 'react';

const months = [
    {
        label: "January",
        value: "01",
    },
    {
        label: "February",
        value: "02",
    },
    {
        label: "March",
        value: "03",
    },
    {
        label: "April",
        value: "04",
    },
    {
        label: "May",
        value: "05",
    },
    {
        label: "June",
        value: "06",
    },
    {
        label: "July",
        value: "07",
    },
    {
        label: "August",
        value: "08",
    },
    {
        label: "September",
        value: "09",
    },
    {
        label: "October",
        value: "10",
    },
    {
        label: "November",
        value: "11",
    },
    {
        label: "December",
        value: "12",
    },
];

const Date = (props) => {
    const { name, value, changeHandler } = props;
    const refs = [];
    const handleChange = (e) => {
        const joined = refs.map(ref => ref.value.trim()).join('-');
        changeHandler({
            name,
            value: joined,
        });
    };
    return (
        <Fragment>
            <input
                type="text"
                placeholder="MM"
                ref={(ref) => refs.push(ref)}
                value={value.split('-')[0] || ''}
                onChange={handleChange}
            />
            <select
                ref={(ref) => refs.push(ref)}
                value={value.split('-')[1] || ''}
                onChange={handleChange}
            >
                {months.map((month, index) => (
                    <option
                        key={index}
                        value={month.value}
                    >
                        {month.label}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="YYYY"
                ref={(ref) => refs.push(ref)}
                value={value.split('-')[2] || ''}
                onChange={handleChange}
            />
        </Fragment>
    );
};

export default Date;
