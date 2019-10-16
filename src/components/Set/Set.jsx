import React from 'react';
import styles from './Set.module.css';
import { FormConsumer } from '../Form';
import Field from '../Field';

const Set = (props) => (
    <FormConsumer>
        {({ formData, setValue }) => {
            const { definition } = props;
            const { name, label, element } = definition;
            const parent = { type: 'set', name };
            const addEntry = (e) => {
                e.preventDefault();
                let child;
                if (element.type === 'group') {
                    child = { value: {} };
                    element.fields.forEach((field) => {
                        child.value[field.name] = "";
                    });
                } else {
                    child = { value: "" };

                }
                setValue(parent)(child);
            };
            return (
                <div className={styles.set}>
                    <div className={styles.labelRow}>
                        <span className={styles.label}>{label}</span>
                        <button className={styles.add} onClick={addEntry}>+</button>
                    </div>
                    {
                        formData[name] && formData[name].map((el, i) => {
                            if (element.type === 'group') {
                                return (
                                    <div key={i} className={styles.inputRow}>
                                        {
                                            element.fields.map((field, j) => {
                                                return (
                                                    <Field
                                                        key={j}
                                                        definition={field}
                                                        parent={{ ...parent, index: i }}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                );
                            } else {
                                return (
                                    <Field
                                        key={i}
                                        definition={element}
                                        parent={{ ...parent, index: i }}
                                    />
                                );
                            }
                        })
                    }
                </div>
            );
        }}
    </FormConsumer>
);

export default Set;
