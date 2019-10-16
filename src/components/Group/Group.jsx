import React from 'react';
import styles from './Group.module.css';
import Field from '../Field';

const Group = (props) => {
    const { definition } = props;
    const { name, label, fields } = definition;
    const parent = { type: 'group', name };
    return (
        <div className={styles.group}>
            <div className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
            </div>
            <div className={styles.inputRow}>
                {fields.map((field, index) => (
                    <Field key={index} definition={field} parent={parent} />
                ))}
            </div>
        </div>
    );
};

export default Group;
