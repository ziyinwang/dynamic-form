import React from 'react';
import Field from '../Field';

const Group = (props) => {
    const { definition } = props;
    // eslint-disable-next-line no-unused-vars
    const { label, fields, ...otherProps } = definition;
    return (
        <div>
            <div>{label}</div>
            {fields.map((field, index) => (
                <Field key={index} definition={field} />
            ))}
        </div>
    );
};

export default Group;
