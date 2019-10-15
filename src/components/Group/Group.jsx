import React from 'react';
import Field from '../Field';

const Group = (props) => {
    const { definition } = props;
    const { name, label, fields } = definition;
    const parent = { type: 'group', name };
    return (
        <div>
            <div>{label}</div>
            {fields.map((field, index) => (
                <Field key={index} definition={field} parent={parent} />
            ))}
        </div>
    );
};

export default Group;
