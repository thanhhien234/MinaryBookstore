import React, { useState, useEffect } from "react";
import PickItem from "../components/PickItem";
import { bookList } from "../routes/data";
import './BestSellersList.css';

function BestSellersList({ activeCategory }) {
    const [showAnimation, setShowAnimation] = useState(true);
    const bestSellers = bookList.filter(book => book.category === activeCategory).slice(0, 5);

    useEffect(() => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 300);
    }, [activeCategory]);

    return (
        <ul className={`best-sellers-list-wrapper ${showAnimation ? 'slide-in' : ''}`}>
            {bestSellers.map((book, index) => (
                <PickItem key={index} book={book} />
            ))}
        </ul>
    );
}

export default BestSellersList;
