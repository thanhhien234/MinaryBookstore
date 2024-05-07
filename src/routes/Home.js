import React, { useState } from "react";
import './Home.css'
import { bookList, postList } from "./data";

function Home() {
    const [createBtnOpen, setCreateBtnOpen] = useState(false);

    const handleCreateBtn = () => {
      setCreateBtnOpen(!createBtnOpen);
    }
    return (
      <div className="main-container">
        <div className="left-container">
            <div className="interest-container">
                <div className="intro-wrapper">
                    <div className="intro-title">P<span>i</span>ck<span>s</span></div>
                    <div className="intro-content">요즘 어떤 책에 관심을 가지고 계신가요?</div>
                </div>
                <div className="interest-wrapper">
                  <ul className="interest-book-wrapper">
                    {bookList.slice(0,4).map((book, index) => (
                      <li key={index} className="interest-book-item">
                        <img src={book.image} alt="" />
                        <div className="title">{book.title}</div>
                        <div className="price-wrapper">
                            <div className="sale-price">{book.salePrice}원</div>
                            <div className="price">{book.price}원</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
            <div className="post-container">
                <div className="post-container-title">책<span>소</span>식</div>
                <ul className="post-wrapper">
                    {postList.map((post, index) => (
                        <li key={index} className="post-item">
                            <img src={post.image} alt=""/>
                            <div className="post-content-wrapper">
                                <div className="post-title">{post.title}</div>
                                <div className="post-content">{post.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
        
        <div className="book-list-container">
            <div className="category-container">
                <div className="sorting-container">
                    <button className="all-btn">전체</button>
                    <button className="all-btn">판매 중</button>
                    <button className="all-btn">예약 중</button>
                    <button className="all-btn">대여 가능</button>
                    <button className="all-btn">대여 중</button>
                    <button className="all-btn">나눔</button>
                </div>
                <div className="category-select-container">
                    <select id="category-select">
                        <option value="all">전체</option>
                        <option value="novel">소설</option>
                        <option value="comic">만화</option>
                        <option value="it">컴퓨터/IT</option>
                        <option value="history">역사</option>
                        <option value="science">과학</option>
                        <option value="art">예술</option>
                        <option value="cook">요리</option>
                        <option value="travel">여행</option>
                        <option value="etc">기타</option>
                    </select>
                </div>
            </div>
            <div className="book-list-content">
              <ul className="book-list-wrapper">
                {bookList.map((book, index) => {
                  const date = book.publicationDate.split('-');
                  const formattedDate = `${date[0]}년 ${date[1]}월 ${date[2]}일`;
                  return (
                    <li key={index} className="book-item">
                      <img src={book.image} alt={book.title}/>
                      <div className="book-info">
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author} - 저자</div>
                        <div className="book-publisher">{book.publisher} . {formattedDate}</div>
                        <div className="book-price-wrapper">
                          <div className="book-sale-price">{book.salePrice}원</div>
                          <div className="book-price">정가: {book.price}원</div>
                        </div>
                        <img className="heart-icon" src={require("../assets/icons/heart-white.png")} alt=""/>
                        <button className="go-to-chat-btn">채팅하기</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
        </div>
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
    </div>
    );
}
export default Home;