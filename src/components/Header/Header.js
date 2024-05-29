import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';
import { InterestItem, ChatItem } from './HeaderItem';
import Chatting from './Chatting';
import { getInterestBookApi } from '../../api/getInterestBookApi';
import { getCookie } from '../../utils/cookieManage';

function ChatGroup({ chatItems, closeChatItem }) {
  return (
    <div className="chat-grid-container">
      {chatItems.map((chatItem, index) => (
        <Chatting
          key={chatItem.id}
          chatItem={chatItem}
          closeChatItem={() => closeChatItem(chatItem.id)}
        />
      ))}
    </div>
  );
}

function Header() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [searchType, setSearchType] = useState('isbn');
  const [activeItem, setActiveItem] = useState(null);
  const [chatItems, setChatItems] = useState([]);
  const user = useSelector((state) => state.user);
  const [interestList, setInterestList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();
  const redirectUrl = `https://kauth.kakao.com/oauth/authorize?&response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

  useEffect(() => {
    if (getCookie("accessToken")) setLoggedIn(true);
    getInterestBookApi()
      .then(res => {
        setInterestList([...res.bookForRentGetResList, ...res.bookForSaleGetResList])
      })
      .catch(error => console.log(error));
  }, [activeItem]);

  useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/chat/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + getCookie("accessToken")
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
            return response.json();
        })
        .then((data) => {
            setChatList(data);
        })
        .catch(error => console.error(error));
    }, []);

  const openChatItem = useCallback((chatItemId) => {
    const clickedChatItem = chatList.find((item) => item.id === chatItemId);
    if (clickedChatItem && !chatItems.some((item) => item.id === chatItemId)) {
      if (chatItems.length >= 3) {
        setChatItems((prevVisibleChats) => prevVisibleChats.slice(1));
      }
      setChatItems((prevVisibleChats) => [...prevVisibleChats, clickedChatItem]);
    }
  }, [chatItems, chatList]);

  const closeChatItem = useCallback((chatItemId) => {
    setChatItems((prevChatItems) =>
      prevChatItems.filter((item) => item.id !== chatItemId)
    );
  }, []);


  return (
    <div className="header-container">
      <div className="search-container">
        <Link to="/">
          <img src={require("../../assets/images/logo.png")} alt="" />
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
              input.value = ''
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
              onClick={() => { setActiveItem(activeItem === 'interest-menu' ? null : 'interest-menu') }}>
              <img src={require("../../assets/icons/interest-menu.png")} alt="" />
            </li>
            <li id="chat-menu" className={`chat-menu ${activeItem === 'chat-menu' ? 'active' : ''}`}
              onClick={() => { setActiveItem(activeItem === 'chat-menu' ? null : 'chat-menu') }}>
              <img src={require("../../assets/icons/chat-menu.png")} alt="" />
            </li>
            <li id="profile-menu">
              <Link to="/my-page">
                <img src={user.img} alt="" />
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
                      key={chatItem.id}
                      chatItem={chatItem}
                      openChatItem={() => openChatItem(chatItem.id)}
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
          <a href={redirectUrl} className='login-btn'>로그인</a>
        </div>
      )}
    </div>
  );
}
export default Header;