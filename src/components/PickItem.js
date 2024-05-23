import React from 'react';
import { Link } from 'react-router-dom';
import './PickItem.css';

function PickItem({ book }) {
  return (
    <Link to={`/detail-book/${book.id}`} className="interest-book-item">
        {book.img ? (<img src={book.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
        <div className="title">{book.title}</div>
        <div className="price-wrapper">
            <div className="sale-price">{book.salePrice}원</div>
            <div className="price">{book.price}원</div>
        </div>
    </Link>
  );
}
export default PickItem;