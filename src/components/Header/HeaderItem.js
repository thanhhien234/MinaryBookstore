import './HeaderItem.css';
import { bookStateList } from '../../utils/sharedData';
import { Link } from 'react-router-dom';

export function InterestItem({ interestItem }) {
  return (
    <li className="interest-item">
      <Link to={`/detail-book/${interestItem.state}/${interestItem.id}`} className="interest-item">
        <img src={interestItem.bookGetRes.img} alt="" />
        <div className="interest-item-info">
          <span className="interest-item-title">{interestItem.bookGetRes.title}</span>
          <span className="interest-item-price">{interestItem.salePrice}원</span>
          <div className={`interest-item-status ${interestItem.state}`}>
            {interestItem.salePrice === 0 ? '나눔' : (bookStateList.find(item => item.name === interestItem.state)?.label || '')}
          </div>
        </div>
      </Link>
    </li>
  );
};


export function ChatItem({ chatItem, openChatItem }) {
  return (
    <li className="chat-item" onClick={() => { openChatItem(chatItem.userId) }}>
      <img src={chatItem.userImg} alt="" />
      <div className="chat-item-info">
        <span className="chat-item-name">{chatItem.userName}</span>
        <span className="chat-item-message">{chatItem.chatContent[chatItem.chatContent.length - 1].comment}</span>
      </div>
    </li>
  );
}