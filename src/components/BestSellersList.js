import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './BestSellersList.css';

function BestSellerItem({ book }) {
    return (
        book && (
            <Link to={`/detail-book/${book.state}/${book.id}`} className="bestSeller-book-item">
                {book.img ? (<img src={book.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
                <div className="title">{book.title}</div>
            </Link>
        )
    );
}

function BestSellersList({ bestSellersList }) {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 300);
    }, [bestSellersList]);

    return (
        <ul className={`best-sellers-list-wrapper ${showAnimation ? 'slide-in' : ''}`}>
            {bestSellersList.map((book, index) => (
                <BestSellerItem key={index} book={book} />
            ))}
        </ul>
    );
}

export default BestSellersList;
