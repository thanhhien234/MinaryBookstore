import React from 'react';
import { Link } from 'react-router-dom';
import './BookItem.css';

const BookItem = ({ book }) => {
  const date = book.publicationDate.split('-');
  const formattedDate = `${date[0]}년 ${date[1]}월 ${date[2]}일`;

  return (
    <Link to={`/detail-book/${book.bookId}`} className="book-item">
      <img src={book.image} alt={book.title} />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author} - 저자</div>
        <div className="book-publisher">{book.publisher} . {formattedDate}</div>
        <div className="book-price-wrapper">
          <div className="book-sale-price">{book.salePrice}원</div>
          <div className="book-price">정가: {book.price}원</div>
        </div>
        <img className="heart-icon" src={require("../assets/icons/heart-white.png")} alt="" />
        <button className="go-to-chat-btn">채팅하기</button>
      </div>
    </Link>
  );
};

export default BookItem;
