import React from "react";
import "./Chatting.css";

function Chatting({chatItem, closeChatItem}) {
    return (
        <div className="chatting-container" onClick={(event) => event.stopPropagation()}>
            <div className="chatting-header">
                <div className="chatting-user-wrapper">
                    <img src={chatItem.userImg} alt="" />
                    <h3>{chatItem.userName}</h3>
                </div>
                <img src={require("../assets/icons/exit.png")} alt="" onClick={closeChatItem}/>
            </div>
            <div className="chatting-content">

            </div>
            <div className="chatting-input-container">
                <input id="chatInput" type="text" placeholder="Aa"/>
                <img src={require("../assets/icons/sentBtn.png")} alt=""/>
            </div>
        </div>
    );
}
export default Chatting;