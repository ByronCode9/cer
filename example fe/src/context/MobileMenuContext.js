// MobileMenusContext.js
import React, { createContext, useState, useContext } from "react";

// Create a context
const MobileMenusContext = createContext();

// Create a context provider
export const MobileMenusProvider = ({ children }) => {
  const [isMobileMenusOpen, setIsMobileMenusOpen] = useState(false);

  const toggleMobileMenus = () => {
    setIsMobileMenusOpen(!isMobileMenusOpen);
  };

  return (
    <MobileMenusContext.Provider value={{ isMobileMenusOpen, toggleMobileMenus }}>
      {children}
    </MobileMenusContext.Provider>
  );
};

// Custom hook to consume the context
export const useMobileMenus = () => {
  return useContext(MobileMenusContext);
};
