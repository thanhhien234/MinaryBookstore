import React from 'react';
import { Link } from 'react-router-dom';
import './BookItem.css';
import { categoryList } from '../routes/Home';

const BookItem = ({ book }) => {
  const date = book.publicationDate.split('T')[0].split('-');
  const formattedDate = `${date[0]}년 ${date[1]}월 ${date[2]}일`;
  console.log(book);

  return (
    <Link to={`/detail-book/${book.id}`} className="book-item">
      {book.img ? (<img src={book.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-category">
          {categoryList.find(item => item.name === book.category)?.label || ''}
        </div>
        <div className="book-author">저자: {book.author}</div>
        <div className="book-publisher">{book.publisher} . {formattedDate}</div>
        <div className="book-price-wrapper">
          <div className="book-sale-price">{book.salePrice}원</div>
          <div className="book-price">정가: {book.price}원</div>
        </div>
        {book.isSave ? (
          <img className="heart-icon" src={require("../assets/icons/heart-red.png")} alt="" />
        ) : (
          <img className="heart-icon" src={require("../assets/icons/heart-white.png")} alt="" />
        )}
        <button className="go-to-chat-btn">채팅하기</button>
      </div>
    </Link>
  );
};

export default BookItem;
