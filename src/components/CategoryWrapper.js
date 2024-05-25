import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryWrapper.css';
import { categoryList } from '../utils/sharedData';

function CategoryWrapper({ activeStatus }) {
    return (
        <div className="category-wrapper">
            {categoryList.map((category, index) => (
                <Link
                    key={index}
                    className='category-item'
                    to={`/book-list/${activeStatus}/${category.name}`}
                >
                    <img src={category.icon} alt={category.label} />
                    <span>{category.label}</span>
                </Link>
            ))}
        </div>
    );
}

export default CategoryWrapper;
