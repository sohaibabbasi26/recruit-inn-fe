// NameProvider.js
import React, { useState } from 'react';
import NameContext from './NameContext';

const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  const updateName = (newName) => {
    setName(newName);
  };

  return (
    <NameContext.Provider value={{ name, updateName }}>
      {children}
    </NameContext.Provider>
  );
};

export default NameProvider;
