import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './Header.css'
import { getCookie, setCookie } from '../utils/cookieManage';
import { InterestItem, ChatItem } from './HeaderItem';
import { chatList } from '../routes/data';
import Chatting from '../components/Chatting';


function ChatGroup({ chatItems, closeChatItem}) {
  return (
    <div className="chat-grid-container">
      {chatItems.map((chatItem, index) => (
        <Chatting
          key={chatItem.userId}
          chatItem={chatItem}
          closeChatItem={() => closeChatItem(chatItem.userId)}
        />
      ))}
    </div>
  );
}


function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchType, setSearchType] = useState('isbn');
  const [activeItem, setActiveItem] = useState(null);
  const [chatItems,setChatItems] = useState([]);

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId === activeItem ? null : itemId);
  };

  const openChatItem = (chatItemId) => {
    if (chatItems.some((item) => item.userId === chatItemId)) {
      return;
    }
    const clickedChatItem = chatList[chatList.findIndex((item) => item.userId === chatItemId)];
    if (chatItems.length >= 3) {
      setChatItems((prevVisibleChats) => prevVisibleChats.slice(1));
    }
    setChatItems((prevVisibleChats) => [...prevVisibleChats, clickedChatItem]);
  };

  const closeChatItem = (chatItemId) => {
    setChatItems((prevChatItems) =>
      prevChatItems.filter((item) => item.userId !== chatItemId)
    );
  };
  

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
              setLoggedIn(true);
          });
      } else {
        setLoggedIn(true);
      }
  },[loggedIn]);

  return (
    <div className="header-container">
        <div className="search-container">
            <Link to="/">
              <img src={require("../assets/images/logo.png")} alt=""/>
            </Link>
            <div className="search-wrapper">
                <select id="search-type" onChange={(event) => setSearchType(event.target.value)}>
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
                <li id="interest-menu" className={`chat-menu ${activeItem === 'interest-menu' ? 'active' : ''}`}
                  onClick={() => {handleMenuClick('interest-menu')}}>
                    <img src={require("../assets/icons/interest-menu.png")} alt=""/>
                </li>
                <li id="chat-menu" className={`chat-menu ${activeItem === 'chat-menu' ? 'active' : ''}`}
                  onClick={() => {handleMenuClick('chat-menu')}}>
                    <img src={require("../assets/icons/chat-menu.png")} alt=""/>
                </li>
                <li id="profile-menu">
                    <img src={require("../assets/images/profile-image.png")} alt=""/>
                </li>
            </ul>
            {activeItem && (
              <div className="open-list-container">
                <h3>{(activeItem === 'interest-menu') ? '관심 목록' : '채팅 목록'}</h3>
                {(activeItem === 'interest-menu') ? (
                  <ul className='open-list-wrapper'>
                    <InterestItem />
                    <InterestItem />
                  </ul>
                ) : (
                  <ul className='open-list-wrapper'>
                      {chatList.map(chatItem => (
                          <ChatItem
                            key={chatItem.userId}
                            chatItem={chatItem}
                            openChatItem ={() => openChatItem (chatItem.userId)}
                          />
                      ))}  
                  </ul>
                )}
              </div>
            )}
            <ChatGroup chatItems={chatItems} closeChatItem={closeChatItem}/>
        </div>
        ) : (
            <div className="login-container">
                <button className="login-btn" onClick={()=>window.location.reload()}>로그인</button>
            </div>
        )}
    </div>
  );
}
export default Header;