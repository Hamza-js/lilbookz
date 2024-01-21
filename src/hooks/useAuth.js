import { useEffect, useState } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        setAccessToken(parsedToken);
        setIsLoggedIn(true);
      } catch (error) {
        // Handle potential parsing errors
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  return { isLoggedIn, accessToken };
}
