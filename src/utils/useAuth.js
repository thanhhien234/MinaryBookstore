import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cookieManage';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        setLoggedIn(false);
      } else if (!getCookie("accessToken")) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie("refreshToken")}`
          }
        });
        const res = await response.json();
        setCookie("accessToken", res.accessToken, 2 * 60);
        setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
        setLoggedIn(true);
      } else {
        setLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  return loggedIn;
};

export default useAuth;
