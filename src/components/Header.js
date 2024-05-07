import React, { useState } from 'react';
import './Header.css'
function Header() {
  const [searchType, setSearchType] = useState('isbn');
  const handleSearchSelect = (event) => {
    setSearchType(event.target.value);
  }
  return (
    <div className="header-container">
        <div className="search-container">
            <img src={require("../assets/images/logo.png")} alt=""/>
            <div className="search-wrapper">
                <select id="search-type" onChange={handleSearchSelect}>
                    <option value="isbn"><span>ISBN 검색</span></option>
                    <option value="title">제목 검색</option>
                </select>
                <input type="text" className="search-input" placeholder={searchType === 'isbn' ? 'ISBN 13자리 숫자를 입력하세요.' : '책 제목을 입력하세요.'} />
                <button className="search-btn">검색</button>
            </div>
            
        </div>
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
    </div>
  );
}
export default Header;