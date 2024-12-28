// TestStateContext.js
import { createContext, useState, useContext } from 'react';

const TestStateContext = createContext(null);

export const useTestState = () => useContext(TestStateContext);

export const TestStateProvider = ({ children }) => {
    const [isTestRequired, setIsTestRequired] = useState(false);
    const [isArabicChosen, setIsArabicChosen] = useState(false);
    // ... other state values

    return (
        <TestStateContext.Provider value={{ isTestRequired, setIsTestRequired, isArabicChosen, setIsArabicChosen }}>
            {children}
        </TestStateContext.Provider>
    );
};