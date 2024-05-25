import { useEffect, useState } from "react";
import "./Chatting.css";
import { chatList } from "../routes/data";

function Chatting({ chatItem, closeChatItem }) {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        setMessage(chatList[0].chatContent);
        const chatInput = document.querySelector('.chatting-input-container');
        chatInput.scrollTo = chatInput.scrollHeight;
    }, [message]);

    return (
        <div className="chatting-container" onClick={(event) => event.stopPropagation()}>
            <div className="chatting-header">
                <div className="chatting-user-wrapper">
                    <img src={chatItem.userImg} alt="" />
                    <h3>{chatItem.userName}</h3>
                </div>
                <img src={require("../assets/icons/exit.png")} alt="" onClick={closeChatItem} />
            </div>
            <div className="chatting-content">
                {
                    message.map((item, i) => {
                        return (
                            <div className={item.isQuestion ? 'question' : 'answer'} key={i}>{item.comment}</div>
                        )
                    })
                }
            </div>
            <div className="chatting-input-container">
                <input id="chatInput" type="text" placeholder="Aa" onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        document.getElementById("sendBtn").click();
                    }
                }} />
                <img id="sendBtn" src={require("../assets/icons/sentBtn.png")} alt="" onClick={() => {
                    let input = document.getElementById("chatInput");
                    const content = input.value;
                    if (content.length > 0) {
                        setMessage([...message, { comment: content, isQuestion: true }]);
                        input.value = "";
                    }
                }} />
            </div>
        </div>
    );
}
export default Chatting;