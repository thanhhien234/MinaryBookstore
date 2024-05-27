import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie, setCookie } from '../utils/cookieManage';
import { getUserInfoApi } from '../api/getUserInfoApi';
import { setUser } from '../store/slices/userSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();

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
                    getUserInfoApi()
                        .then(res => dispatch(setUser({ name: res.name, img: res.img })))
                        .catch(error => console.log(error));
                })
                .catch(error => {
                    alert("관리자에게 문의해주세요.");
                    setLoggedIn(false);
                });
        }
        else {
            setLoggedIn(true);
            getUserInfoApi()
                .then(res => dispatch(setUser({ name: res.name, img: res.img })))
                .catch(error => console.log(error));
        }
    }, [loggedIn]);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
