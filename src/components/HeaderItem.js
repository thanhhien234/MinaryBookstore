import React from 'react';
import './HeaderItem.css';

export function InterestItem() {
  return (
    <li className="interest-item">
        <img src={require("../assets/images/exampleBook.png")} alt=""/>
        <div className="interest-item-info">
            <span className="interest-item-title">생활코딩! React 리액트 프로그래밍</span>
            <span className="interest-item-price">12500원</span>
        </div>
    </li>
  );
};
export function ChatItem() {
  return (
    <li className="chat-item">
        <img src={require("../assets/images/profile-image.png")} alt=""/>
        <div className="chat-item-info">
            <span className="chat-item-name">한승규</span>
            <span className="chat-item-message">채팅 메시지</span>
        </div>
    </li>
  );
}