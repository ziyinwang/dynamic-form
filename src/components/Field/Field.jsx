import React from 'react';
import Input from '../Input';
import { FormConsumer } from '../Form';

const Field = (props) => (
    <FormConsumer>
        {({ formData, setValue }) => {
            const { definition, parent } = props;
            const { name, label, ...inputProps } = definition;
            let value = '';
            if (parent) {
                const { type: parentType, name: parentName } = parent;
                switch (parentType) {
                    case 'group':
                        value = formData[parentName]
                            ? (formData[parentName][name] || '')
                            : '';
                        break;
                    default:
                        break;
                }
            } else {
                value = formData[name] || '';
            }
            return (
                <div>
                    <div>{label}</div>
                    <div>
                        <Input
                            name={name}
                            value={value}
                            changeHandler={setValue(parent)}
                            {...inputProps}
                        />
                    </div>
                </div>
            );
        }}
    </FormConsumer>
);

export default Field;
