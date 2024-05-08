import React, { useState } from "react";
import { bookList, postList } from "./data";
import { Link } from 'react-router-dom';
import './Home.css'
import BookItem from "../components/BookItem";
import CreateBtn from "../components/CreateBtn";

function Home() {
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
                      <Link to={`/detail-book/${book.bookId}`} key={index} className="interest-book-item">
                        <img src={book.image} alt="" />
                        <div className="title">{book.title}</div>
                        <div className="price-wrapper">
                            <div className="sale-price">{book.salePrice}원</div>
                            <div className="price">{book.price}원</div>
                        </div>
                      </Link>
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
                {bookList.map((book, index) => (
                  <BookItem key={index} book={book} />
                ))}
              </ul>
            </div>
        </div>
        <CreateBtn />
    </div>
    );
}
export default Home;