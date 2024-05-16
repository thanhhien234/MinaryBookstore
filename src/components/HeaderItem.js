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


export function ChatItem({ chatItem, openChatItem }) {
  return (
    <li className="chat-item" onClick={()=>{openChatItem(chatItem.userId)}}>
        <img src={chatItem.userImg} alt=""/>
        <div className="chat-item-info">
            <span className="chat-item-name">{chatItem.userName}</span>
            <span className="chat-item-message">{chatItem.chatContent[chatItem.chatContent.length-1].comment}</span>
        </div>
    </li>
  );
}