import React from 'react';
import styles from './Field.module.css';
import Input from '../Input';
import { FormConsumer } from '../Form';

const Field = (props) => (
    <FormConsumer>
        {({ formData, setValue }) => {
            const { definition, parent } = props;
            const { name, label, ...inputProps } = definition;
            let value = '';
            if (parent) {
                switch (parent.type) {
                    case 'group':
                        value = formData[parent.name]
                            ? (formData[parent.name][name] || '')
                            : '';
                        break;
                    case 'set':
                        value = name
                            ? (formData[parent.name][parent.index][name] || '')
                            : (formData[parent.name][parent.index] || '');
                        break;
                    default:
                        break;
                }
            } else {
                value = formData[name] || '';
            }
            return (
                <div className={definition.type === 'checkbox' ? styles.checkboxField : styles.field}>
                    {
                        label && (
                            <div className={styles.labelRow}>
                                <span className={styles.label}>{label}</span>
                            </div>
                        )
                    }
                    <div className={styles.inputRow}>
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
