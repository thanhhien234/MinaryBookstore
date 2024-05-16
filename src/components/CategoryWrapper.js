import React from "react";
import './CategoryWrapper.css'

function CategoryWrapper() {
    return (
        <div className="category-wrapper">
            <div className='category-item'>
                <img src={require('../assets/icons/novel.png')} alt=""/>
                <span>소설</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets//icons/literature.png')} alt=""/>
                <span>인문</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/computer.png')} alt=""/>
                <span>컴퓨터/IT</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/language.png')} alt=""/>
                <span>외국어</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/history.png')} alt=""/>
                <span>역사/문화</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/science.png')} alt=""/>
                <span>과학</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/magazine.png')} alt=""/>
                <span>잡지</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/children.png')} alt=""/>
                <span>어린이</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/headphone.png')} alt=""/>
                <span>자기개발</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/travel.jpg')} alt=""/>
                <span>여행</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/cooking.png')} alt=""/>
                <span>요리</span>
            </div>
            <div className='category-item'>
                <img src={require('../assets/icons/star.png')} alt=""/>
                <span>기타</span>
            </div>
        </div>
    );
}
export default CategoryWrapper;