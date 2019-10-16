import React from 'react';
import { Fragment } from 'react';

const Text = (props) => {
    const { name, value, multiparts, changeHandler } = props;
    let children = (
        <input
            type='text'
            value={value}
            onChange={(e) => changeHandler({
                name,
                value: e.target.value,
            })}
        />
    );
    if (multiparts) {
        const { seperator, parts } = multiparts;
        const refs = [];
        children = parts.map(
            (part, index) => {
                return (
                    <input
                        type='text'
                        key={index}
                        ref={(ref) => refs.push(ref)}
                        value={value.split(seperator)[index] || ''}
                        placeholder={part.placeholder}
                        onChange={(e) => {
                            const joined = refs.map(ref => ref.value.trim()).join(seperator);
                            changeHandler({
                                name,
                                value: joined,
                            });
                        }}
                    />
                )
            }
        );
    }
    return (
        <Fragment>{children}</Fragment>
    );
};

export default Text;
