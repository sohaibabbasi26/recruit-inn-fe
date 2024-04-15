// TestStateContext.js
import { createContext, useState, useContext } from 'react';

const TestStateContext = createContext(null);

export const useTestState = () => useContext(TestStateContext);

export const TestStateProvider = ({ children }) => {
    const [isTestRequired, setIsTestRequired] = useState(false);
    // ... other state values

    return (
        <TestStateContext.Provider value={{ isTestRequired, setIsTestRequired }}>
            {children}
        </TestStateContext.Provider>
    );
};