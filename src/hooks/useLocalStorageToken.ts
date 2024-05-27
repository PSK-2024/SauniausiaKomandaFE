import { useState, useEffect } from 'react';

const useLocalStorageToken = (key: string) => {
  const [token, setToken] = useState(() => localStorage.getItem(key));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem(key));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return token;
};

export default useLocalStorageToken;
