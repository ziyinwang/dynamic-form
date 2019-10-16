import React, { createContext } from 'react';
import merge from 'deepmerge';
import _get from 'lodash.get';
import operators from '../../utils/operators';
import styles from './Form.module.css';
import Field from '../Field';
import Group from '../Group';
import Set from '../Set';

const FormContext = createContext({});
const SetValueContext = createContext(() => { });

const Form = (props) => {
    const { definition } = props;
    const [formData, setFormData] = React.useState({});
    const setValue = (parent) => (child) => {
        // TODO refactor
        let updated;
        if (parent) {
            switch (parent.type) {
                case 'group':
                    updated = {
                        [parent.name]: {
                            [child.name]: child.value,
                        }
                    };
                    setFormData((prevFormData) => merge(prevFormData, updated));
                    break;
                case 'set':
                    if (typeof parent.index === "undefined") {
                        updated = {
                            [parent.name]: [
                                child.value,
                            ]
                        };
                        setFormData((prevFormData) => merge(prevFormData, updated));
                        break;
                    } else {
                        setFormData((prevFormData) => {
                            const nextFormData = merge(prevFormData, {});
                            if (child.name) {
                                nextFormData[parent.name][parent.index][child.name] = child.value;
                            } else {
                                nextFormData[parent.name][parent.index] = child.value;
                            }
                            return nextFormData;
                        });
                        break;
                    }
                default:
                    console.debug(`unsupported parent type ${parent.type}, setValue is skipped.`);
                    break;
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [child.name]: child.value,
            }));
        }
    };

    const conditionsMet = (conditions) => {
        if (!conditions) return true;
        const results = conditions.map((condition) => {
            const { path, operator, value: expected } = condition;
            let op;
            const not = /^not\./.test(operator);
            if (not) {
                [, op] = operator.split(/\./);
            } else { op = operator; }
            const operateFunc = operators[op];
            if (!operateFunc) {
                console.debug(`unsupported operator ${operator}, default to return false from condition check.`);
                return false;
            }
            const received = _get(formData, path);
            const conditionMet = typeof expected === 'undefined'
                ? operateFunc({ received, not })
                : operateFunc({ received, expected, not });
            return conditionMet;
        });
        return results.every(result => result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO run validation
    };

    return (
        <FormContext.Provider value={formData}>
            <SetValueContext.Provider value={setValue}>
                <div className={styles.playground}>
                    <div className={styles.leftPanel}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {definition.map((field, index) => {
                                const { type, conditions } = field;
                                let children = <Field key={index} definition={field} />;
                                switch (type) {
                                    case 'group':
                                        children = <Group key={index} definition={field} />;
                                        break;
                                    case 'set':
                                        children = <Set key={index} definition={field} />;
                                        break;
                                    default:
                                        break;
                                }
                                return (conditionsMet(conditions) && children);
                            })}
                            <div className={styles.submit}>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                    <div className={styles.rightPanel}>
                        <div className={styles.output}>
                            <div className={styles.outputHeader}>Output:</div>
                            <pre>
                                {JSON.stringify(formData, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </SetValueContext.Provider>
        </FormContext.Provider>
    );
};

export const FormConsumer = ({ children }) => {
    return (
        <FormContext.Consumer>
            {formData => (
                <SetValueContext.Consumer>
                    {setValue => children({ formData, setValue })}
                </SetValueContext.Consumer>
            )}
        </FormContext.Consumer>
    );
};

export default Form;
