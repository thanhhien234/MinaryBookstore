import Chatting from "./Chatting";
import "./ChatGroup.css";

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

export default ChatGroup;