import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';
import { InterestItem, ChatItem } from './HeaderItem';
import Chatting from './Chatting';
import { getInterestBookApi } from '../../api/getInterestBookApi';
import { getCookie } from '../../utils/cookieManage';
import { clearChat } from '../../store/slices/chatSlice';

function ChatGroup({ chatShow, closeChatItem }) {
  return (
    <div className="chat-grid-container">
      {chatShow.map((chatItem, index) => (
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
  const [activeItem, setActiveItem] = useState(null);  //interest-menu, chat-menu
  const user = useSelector((state) => state.user);
  const [interestList, setInterestList] = useState([]);

  const [chatShow, setChatShow] = useState([]);  //visible chat list ( max 3 items)
  const [chatList, setChatList] = useState([]);  //get chat list from server by api
  const chat = useSelector((state) => state.chat);   //get new chat slice

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chat.id) {
      const newChatItem = {
        id: chat.id,
        name: chat.name,
        img: chat.img,
        chat : ''
      };
      if (chatShow.length >= 3) {
        setChatShow((prevVisibleChats) => prevVisibleChats.slice(1));
      }
      setChatShow((prevVisibleChats) => [...prevVisibleChats, newChatItem]);
    }
  }, [chat]);

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
    if (clickedChatItem && !chatShow.some((item) => item.id === chatItemId)) {
      if (chatShow.length >= 3) {
        setChatShow((prevVisibleChats) => prevVisibleChats.slice(1));
      }
      setChatShow((prevVisibleChats) => [...prevVisibleChats, clickedChatItem]);
    }
  }, [chatShow, chatList]);

  const closeChatItem = useCallback((chatItemId) => {
    setChatShow((prevChatItems) =>
      prevChatItems.filter((item) => item.id !== chatItemId)
    );
    dispatch(clearChat());
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
          <ChatGroup chatShow={chatShow} closeChatItem={closeChatItem}/>
        </div>
      ) : (
        <div className="login-container">
          <a href={`https://kauth.kakao.com/oauth/authorize?&response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`} className='login-btn'>로그인</a>
        </div>
      )}
    </div>
  );
}
export default Header;