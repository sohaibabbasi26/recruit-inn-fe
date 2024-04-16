import { createContext, useContext, useState } from 'react';

const ActiveFlowContext = createContext();

export const useActiveFlow = () => useContext(ActiveFlowContext);

export const ActiveFlowProvider = ({ children }) => {
  const [activeFlow, setActiveFlow] = useState('client');

  return (
    <ActiveFlowContext.Provider value={{ activeFlow, setActiveFlow }}>
      {children}
    </ActiveFlowContext.Provider>
  );
};