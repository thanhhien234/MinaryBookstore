import React, { useState } from "react";
import { bookList, postList } from "./data";
import { Link } from 'react-router-dom';
import './Home.css'
import BookItem from "../components/BookItem";
import PickItem from "../components/PickItem";
import CreateBtn from "../components/CreateBtn";

function Home() {
    return (
      <div className="main-container">
        <div className="book-list-container">
            <div className="sorting-container">
              <button className="all-btn">판매 중</button>
              <button className="all-btn">예약 중</button>
              <button className="all-btn">대여 가능</button>
              <button className="all-btn">대여 중</button>
              <button className="all-btn">나눔</button>
            </div>
            <div className="book-list-content">
              <ul className="book-list-wrapper">
                {bookList.slice(0,6).map((book, index) => (
                  <BookItem key={index} book={book} />
                ))}
              </ul>
            </div>
        </div>
        <div className="best-sellers-container">
          <h3 className="best-sellers-title">
            B<span>e</span>st S<span>e</span>ll<span>e</span>rs
          </h3>
          <div className="best-sellers-category-wrapper">
              <button className="best-sellers-btn">소설</button>
              <button className="best-sellers-btn">인문</button>
              <button className="best-sellers-btn">컴퓨터/IT</button>
              <button className="best-sellers-btn">외국어</button>
              <button className="best-sellers-btn">역사/문화</button>
              <button className="best-sellers-btn">과학</button>
              <button className="best-sellers-btn">기타</button>
          </div>
          <div className="best-sellers-wrapper">
              <ul className="best-sellers-list-wrapper">
                {bookList.slice(0,5).map((book, index) => (
                  <PickItem key={index} book={book} />
                ))}
              </ul>
          </div>
        </div>
        <div className="interest-container">
                <div className="intro-wrapper">
                    <h3 className="intro-title">P<span>i</span>ck<span>s</span></h3>
                    <div className="intro-content">요즘 어떤 책에 관심을 가지고 계신가요?</div>
                    <button className="show-more-btn">더보기</button>
                </div>
                <div className="interest-wrapper">
                  <ul className="interest-book-wrapper">
                    {bookList.slice(0,5).map((book, index) => (
                      <PickItem key={index} book={book} />
                    ))}
                  </ul>
                </div>
            </div>

        <CreateBtn />
    </div>
    );
}
export default Home;