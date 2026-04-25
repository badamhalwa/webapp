import React, { createContext, useState, useContext } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [activePortal, setActivePortal] = useState('hospital'); // 'hospital' or 'academic'

  return (
    <PortalContext.Provider value={{ activePortal, setActivePortal }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
