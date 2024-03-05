// FormContext.js
import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formState, setFormState] = useState({
        position: '',
        location: '',
        jobtype: '',
        description: '',
    });

    return (
        <FormContext.Provider value={{ formState, setFormState }}>
            {children}
        </FormContext.Provider>
    );
};
