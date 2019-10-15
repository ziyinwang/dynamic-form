import React, { createContext } from 'react';
import merge from 'deepmerge';
import Field from '../Field';
import Group from '../Group';
import Set from '../Set';

const FormContext = createContext({});
const SetValueContext = createContext(() => { });

const Form = (props) => {
    const { definition } = props;
    const [formData, setFormData] = React.useState({});
    const setValue = (parent) => (name, value) => {
        if (parent) {
            const { name: groupName, type } = parent;
            switch (type) {
                case 'group':
                    const updated = {
                        [groupName]: {
                            [name]: value,
                        }
                    };
                    setFormData((prevFormData) => merge(prevFormData, updated));
                    break;
                case 'set':
                    break;
                default:
                    console.debug(`unsupported parent type ${type}, setValue is skipped.`);
                    break;
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO run validation
    };

    return (
        <FormContext.Provider value={formData}>
            <SetValueContext.Provider value={setValue}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    {definition.map((field, index) => {
                        const { type } = field;
                        let children = (<Field key={index} definition={field} />);
                        switch (type) {
                            case 'group':
                                children = (<Group key={index} definition={field} />);
                                break;
                            case 'set':
                                children = (<Set key={index} definition={field} />);
                                break;
                            default:
                                break;
                        }
                        return children;
                    })}
                    <input type="submit" value="Submit" />
                </form>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
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
