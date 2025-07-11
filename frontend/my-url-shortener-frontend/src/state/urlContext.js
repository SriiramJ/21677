import { createContext, useContext, useState } from 'react';

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  return (
    <UrlContext.Provider value={{ urls, setUrls }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => useContext(UrlContext);
