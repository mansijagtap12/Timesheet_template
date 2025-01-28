import React, { createContext, useState, useContext } from "react";

// Create Context
const SearchContext = createContext();

// Provider Component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook to Use Search Context
export const useSearch = () => useContext(SearchContext);
