import React, { useState } from 'react';
import Field from '../Field';

const Set = (props) => {
    const { definition } = props;
    const { label, element, initialValue } = definition;
    const [state, setState] = useState(initialValue);
    const addEntry = (e) => {
        e.preventDefault();
        setState([...state, ...initialValue]);
    };
    return (
        <div>
            <div>{label}<button onClick={addEntry}>add</button></div>
            {
                state.map((el, i) => {
                    if (element.type === 'group') {
                        return element.fields.map((field, j) => {
                            return (
                                <Field key={j} definition={field} />
                            );
                        });
                    } else {
                        return (
                            <Field key={i} definition={element} />
                        );
                    }
                })
            }
        </div>
    );
};

export default Set;
