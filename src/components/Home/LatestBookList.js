import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './LatestBookList.css';

function LatestBookItem({ book }) {
    return (
        book && (
            <li>
                <Link to={`/detail-book/${book.id}`} className="latest-book-item">

                    {book.img ? (<img src={book.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
                    <div className="title">{book.title}</div>

                </Link>
            </li>
        )
    );
}

function LatestBookList({ latestBookList }) {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 300);
    }, [latestBookList]);

    return (
        <ul className={`latest-list-wrapper ${showAnimation ? 'slide-in' : ''}`}>
            {latestBookList.map((book, index) => (
                <LatestBookItem key={index} book={book} />
            ))}
        </ul>
    );
}

export default LatestBookList;
