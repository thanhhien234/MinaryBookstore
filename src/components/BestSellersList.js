import React, { useState, useEffect } from "react";
import PickItem from "../components/PickItem";
import { bookList } from "../routes/data";
import './BestSellersList.css';

function BestSellersList({ bestSellersList}) {
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
                <PickItem key={index} book={book} />
            ))}
        </ul>
    );
}

export default BestSellersList;
