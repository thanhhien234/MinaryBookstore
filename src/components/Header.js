import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { InterestItem, ChatItem } from './HeaderItem';
import { chatList } from '../routes/data';
import Chatting from '../components/Chatting';
import useAuth from '../hooks/useAuth';
import { getCookie } from '../utils/cookieManage';

function ChatGroup({ chatItems, closeChatItem }) {
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
  const loggedIn = useAuth();
  const [searchType, setSearchType] = useState('isbn');
  const [activeItem, setActiveItem] = useState(null);
  const [chatItems,setChatItems] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [myProfile, setMyProfile] = useState({});
  const navigate = useNavigate();

  const handleMenuClick = useCallback((itemId) => {
    setActiveItem(itemId === activeItem ? null : itemId);
  }, [activeItem]);

  const openChatItem = useCallback((chatItemId) => {
    if (chatItems.some((item) => item.userId === chatItemId)) {
      return;
    }
    const clickedChatItem = chatList.find((item) => item.userId === chatItemId);
    if (chatItems.length >= 3) {
      setChatItems((prevVisibleChats) => prevVisibleChats.slice(1));
    }
    setChatItems((prevVisibleChats) => [...prevVisibleChats, clickedChatItem]);
  }, [chatItems]);

  const closeChatItem = useCallback((chatItemId) => {
    setChatItems((prevChatItems) =>
      prevChatItems.filter((item) => item.userId !== chatItemId)
    );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/list`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + getCookie('accessToken'),}
    })
    .then(response => {
        if (response.status === 200) {
          return response.json();
        }
    })
    .then(res => {
      res.forEach(item => {
        if (item.isSave) {
            setInterestList(prev => [...prev, item]);
        }
      });
    })    
    .catch(error => console.log(error));

    fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent/list`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + getCookie('accessToken'),}
    })
    .then(response => {
        if (response.status === 200) {
          return response.json();
        }
    })
    .then(res => {
      res.forEach(item => {
        if (item.isSave === true) {
            setInterestList(prev => [...prev, item]);
        }
      });
    })    
    .catch(error => console.log(error));
    
  }, []);

  useEffect(() => {
    console.log('interestList', interestList);
  }, [interestList]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth`,{
      headers: {
        'Authorization': 'Bearer ' + getCookie('accessToken'),
      }
    })
    .then(response => {
      console.log('response', response);
      if (response.status === 200) return response.json();
    })
    .then(res => setMyProfile(res))
    .catch(error => console.log(error));
  }, []);

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
          <button className="search-btn"
               onClick={() => {
                  const input = document.querySelector('.search-input');
                  navigate(`/search-book-list/${searchType}/${input.value}`);
                  input.value=''
              }}
          >
          검색
          </button>
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
                <Link to="/my-page">
                    <img src={myProfile.img} alt=""/>
                </Link>
            </li>
          </ul>
          {activeItem && (
            <div className="open-list-container">
                <h3>{(activeItem === 'interest-menu') ? '관심 목록' : '채팅 목록'}</h3>
                {(activeItem === 'interest-menu') ? (
                  <ul className='open-list-wrapper'>
                    {interestList.map(interestItem => (
                      <InterestItem key={interestItem.id} interestItem={interestItem} />
                    ))}
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