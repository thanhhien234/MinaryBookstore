import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateBtn.css';

function CreateBtn() {
    const [createBtnOpen, setCreateBtnOpen] = useState(false);

    window.addEventListener('mousedown', function(event) {
        if (!event.target.closest('.create-button-container')) {
            setCreateBtnOpen(false);
        }
    });

    return (
        <div className="create-button-container">
            <div className="create-btn" onClick={()=>setCreateBtnOpen(!createBtnOpen)}>
                <img src={require("../assets/icons/plus.png")} alt="" />
                <span>등록하기</span>
            </div>
            <ul className={`create-option-wrapper ${createBtnOpen ? 'show' : ''}`}>
                <li>
                    <Link to="/create-post">
                        <img src={require("../assets/icons/post-create.png")} alt=""/>
                        <span>게시글 작성</span>
                    </Link>
                </li>
                <li>
                    <Link to="/create-book/rent">
                        <img src={require("../assets/icons/rent-create.png")} alt=""/>
                        <span>책 대여 등록하기</span>
                    </Link>
                </li>
                <li>
                    <Link to="/create-book/sale">
                        <img src={require("../assets/icons/sell-create.png")} alt=""/>
                        <span>책 판매하기</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default CreateBtn;