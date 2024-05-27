import React, { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cookieManage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!getCookie("accessToken") && !getCookie("refreshToken")) {
            setLoggedIn(false);
        }
        else if (!getCookie("accessToken") && getCookie("refreshToken")) {
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie("refreshToken")}`
                }
            })
                .then(response => response.json())
                .then(res => {
                    setCookie("accessToken", res.accessToken, 2 * 60);
                    setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
                    setLoggedIn(true);
                })
                .catch(error => {
                    alert("관리자에게 문의해주세요.");
                    setLoggedIn(false);
                });
        }
        else {
            setLoggedIn(true);
        }
    }, [loggedIn]);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
