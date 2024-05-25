import { useState } from 'react';
import { getCookie, setCookie } from '../utils/cookieManage';

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken && !refreshToken) {
      return false;
    }

    if (!accessToken && refreshToken) {
      fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      })
      .then(response => response.json())
      .then(res => {
        setCookie("accessToken", res.accessToken, 2 * 60);
        setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
        setLoggedIn(true);
      })
      .catch(() => setLoggedIn(false));

      return false;
    }

    return true;
  });

  return loggedIn;
};

export default useAuth;
