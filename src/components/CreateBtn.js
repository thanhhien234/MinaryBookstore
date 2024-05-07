import React, { useState } from 'react';
import './CreateBtn.css';

function CreateBtn() {
    const [createBtnOpen, setCreateBtnOpen] = useState(false);

    const handleCreateBtn = () => {
      setCreateBtnOpen(!createBtnOpen);
    }
    return (
        <div className="create-button-container">
            <div className="create-btn" onClick={handleCreateBtn}>
                <img src={require("../assets/icons/plus.png")} alt="" />
                <span>등록하기</span>
            </div>
            <ul className={`create-option-wrapper ${createBtnOpen ? 'show' : ''}`}>
                <li className="post-create-btn">
                    <img src={require("../assets/icons/post-create.png")} alt=""/>
                    <span>게시글 작성</span>
                </li>
                <li className="shre-create-btn">
                    <img src={require("../assets/icons/share-create.png")} alt=""/>
                    <span>책 나누기</span>
                </li>
                <li className="rent-create-btn">
                    <img src={require("../assets/icons/rent-create.png")} alt=""/>
                    <span>책 대여 등록하기</span>
                </li>
                <li className="sell-create-btn">
                    <img src={require("../assets/icons/sell-create.png")} alt=""/>
                    <span>책 판매하기</span>
                </li>
            </ul>
        </div>
  );
};
export default CreateBtn;