import React, { useState, useEffect } from "react";
import { bookList } from "./data";
import './Home.css'
import BookItem from "../components/BookItem";
import PickItem from "../components/PickItem";
import CreateBtn from "../components/CreateBtn";
import CategoryWrapper from "../components/CategoryWrapper";
import BestSellersList from "../components/BestSellersList";

function Home() {
    const [categoryShow,setCategoryShow] = useState(false);
    const [activeCategory, setActiveCategory] = useState('소설');

    window.addEventListener('mousedown', function(event) {
      if (!event.target.closest('.all-btn')) {
        setCategoryShow(false);
      }
    });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const bestSellersCategories = ["소설", "인문", "컴퓨터/IT", "외국어", "역사/문화", "과학", "기타"];
    const buttonArr = ['판매 중', '예약 중', '대여 가능', '대여 중', '나눔'];
    
    return (
      <div className="main-container">
        <div className="book-list-container">
            <div className="sorting-container">
              {buttonArr.map((category, index) => (
                  <button key={index} className="all-btn" onClick={() => setCategoryShow(true)}>
                      {category}
                  </button>
              ))}
              {categoryShow && <CategoryWrapper />}
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
              {bestSellersCategories.map((name, index) => (
                    <button key={index} className={`best-sellers-btn ${activeCategory === name ? 'active' : ''}`} onMouseOver={() => setActiveCategory(name)}>{name}</button>
              ))}
          </div>
          {activeCategory && <BestSellersList activeCategory={activeCategory} />}
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