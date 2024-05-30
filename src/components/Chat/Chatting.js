import { useEffect, useState, useRef } from "react";
import "./Chatting.css";
import { getCookie } from "../../utils/cookieManage";

function Chatting({ chatItem, closeChatItem }) {
    const [message, setMessage] = useState([]);
    const chatContentRef = useRef(null);
    const webSocket = useRef(null);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/chat?userId=${chatItem.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getCookie("accessToken")}`
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
            return response.json();
        })
        .then((data) => {
            const realData = data.map(msg => ({
                ...msg,
                localDateTime: new Date(new Date(msg.localDateTime).getTime() + 9 * 60 * 60 * 1000).toISOString()
            }));
            setMessage(realData);
        })
        .catch(error => console.error(error));
    }, [chatItem.id]);



    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [message]);

    useEffect(() => {
        webSocket.current = new WebSocket('wss://king-seungkyu3.shop/chat');

        webSocket.current.onopen = function () {
            setIsWebSocketOpen(true);

            const initialMessage = {
                isEstablished: true,
                accessToken: getCookie("accessToken"),
                receiver: chatItem.id,
            };
            webSocket.current.send(JSON.stringify(initialMessage));
        };

        webSocket.current.onmessage = function (event) {
            const receivedMessage = event.data.split('"')[1];
            const answer = {
                content: receivedMessage,
                isUser: false,
                localDateTime: new Date().toISOString()
            };
            setMessage(prevMessages => [...prevMessages, answer]);
        };

        webSocket.current.onerror = function (error) {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [chatItem.id]);

    const handleSendMessage = () => {
        const input = document.getElementById(`chatInput-${chatItem.id}`);
        const content = input.value.trim();
        if (content.length > 0 && isWebSocketOpen) {
            const sendData = {
                isEstablished: false,
                accessToken: getCookie("accessToken"),
                receiver: chatItem.id,
                content: content
            }
            const newMessage = { content: content, isUser: true, localDateTime: new Date().toISOString() };
            setMessage(prevMessages => [...prevMessages, newMessage]);
            webSocket.current.send(JSON.stringify(sendData));
            input.value = "";
        }
    };
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const timeString = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        const dateString = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        return { timeString, dateString };
    };

    const renderMessages = () => {
        let lastDate = null;
        
        return message.map((item, i) => {
            const { timeString, dateString } = formatDateTime(item.localDateTime);
            let showDate = false;
            if (lastDate !== dateString) {
                showDate = true;
                lastDate = dateString;
            }

            let showTime = true;
            if (i < message.length - 1 && item.isUser === message[i + 1].isUser) { // Check if the next message is of the same type
                showTime = false;
            }

            return (
                <div key={i}>
                    {showDate && <div className="message-date">{dateString}</div>}
                    <div className={item.isUser ? 'question' : 'answer'}>
                        {item.content}
                    </div>
                    {showTime && <div className={`message-time ${item.isUser ? 'question' : 'answer'}`}>{timeString}</div>}
                </div>
            );
        });
    };


    return (
        <div className="chatting-container" onClick={(event) => event.stopPropagation()}>
            <div className="chatting-header">
                <div className="chatting-user-wrapper">
                    <img src={chatItem.img} alt="" />
                    <h3>{chatItem.name}</h3>
                </div>
                <img src={require("../../assets/icons/exit.png")} alt="" onClick={() => {
                    closeChatItem(chatItem.id);
                    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
                        webSocket.current.close();
                    }
                }} />
            </div>
            <div className="chatting-content" ref={chatContentRef}>
                {renderMessages()}
            </div>
            <div className="chatting-input-container">
                <input className="chat-input" id={`chatInput-${chatItem.id}`} type="text" placeholder="Aa" onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        document.getElementById(`sendBtn-${chatItem.id}`).click();
                    }
                }} />
                <img id={`sendBtn-${chatItem.id}`} src={require("../../assets/icons/sentBtn.png")} alt="" onClick={() => {
                    handleSendMessage();
                }} />
            </div>
        </div>
    );
}
export default Chatting;