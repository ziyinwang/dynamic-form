import React from 'react';
import Input from '../Input';
import { FormConsumer } from '../Form';

const Field = (props) => (
    <FormConsumer>
        {({ formData, setValue }) => {
            const { definition } = props;
            const { name, label, ...inputProps } = definition;
            return (
                <div>
                    <div>{label}</div>
                    <div>
                        <Input
                            name={name}
                            value={formData[name] || ""}
                            changeHandler={setValue}
                            {...inputProps}
                        />
                    </div>
                </div>
            );
        }}
    </FormConsumer>
);

export default Field;
