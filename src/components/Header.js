import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header({loggedIn, setLoggedIn}) {
  const [searchType, setSearchType] = useState('isbn');
  const navigate = useNavigate();

  const setCookie = (cookieName, cookieValue, expirationDays) =>{
      const date = new Date();
      date.setTime(date.getTime() + (expirationDays * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      const cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/";
      document.cookie = cookie;
  }

  const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) {
              return cookie.substring(name.length + 1);
          }
      }
      return null;
  }

  useEffect(() => {
      if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        setLoggedIn(false);
      } else if (!getCookie("accessToken")) {
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
              window.location.reload();
          });
      } else {
        setLoggedIn(true);
      }
  });


  const handleSearchSelect = (event) => {
    setSearchType(event.target.value);
  }
  const handleLoginClick = () => {
    window.location.reload();
  }
  const handleLogoClick = () => {
    navigate('/');
  }
  return (
    <div className="header-container">
        <div className="search-container">
            <img src={require("../assets/images/logo.png")} alt="" onClick={handleLogoClick}/>
            <div className="search-wrapper">
                <select id="search-type" onChange={handleSearchSelect}>
                    <option value="isbn">ISBN 검색</option>
                    <option value="title">제목 검색</option>
                </select>
                <input type="text" className="search-input" placeholder={searchType === 'isbn' ? 'ISBN 13자리 숫자를 입력하세요.' : '책 제목을 입력하세요.'} />
                <button className="search-btn">검색</button>
            </div>
            
        </div>
        {loggedIn ? (
            <div className="menu-container">
            <ul className="menu-wrapper">
                <li id="interest-menu">
                    <img src={require("../assets/icons/interest-menu.png")} alt=""/>
                </li>
                <li id="chat-menu">
                    <img src={require("../assets/icons/chat-menu.png")} alt=""/>
                </li>
                <li id="profile-menu">
                    <img src={require("../assets/images/profile-image.png")} alt=""/>
                </li>
            </ul>
        </div>
        ) : (
            <div className="login-container">
                <button className="login-btn" onClick={handleLoginClick}>로그인</button>
            </div>
        )}
    </div>
  );
}
export default Header;