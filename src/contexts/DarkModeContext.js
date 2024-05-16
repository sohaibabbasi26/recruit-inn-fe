import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {}
});

export const DarkModeProvider = ({ children }) => {
    // Initialize with false; we'll check localStorage when we know we're on the client
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // This code runs only on the client
        const storedMode = localStorage.getItem('dark-mode');
        const prefersDarkMode = storedMode ? JSON.parse(storedMode) : false;
        setDarkMode(prefersDarkMode);
        document.documentElement.classList.toggle('dark', prefersDarkMode);
    }, []);

    useEffect(() => {
        // Update localStorage and class on changes to isDarkMode
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
