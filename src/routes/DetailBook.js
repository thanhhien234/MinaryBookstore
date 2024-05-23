import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailBook.css'
import CreateBtn from '../components/CreateBtn';
import ConditionRadioList from '../components/ConditionRadioList';
import { getCookie } from '../utils/cookieManage';
import { categoryList } from './Home';

function DetailBook() {
    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${year}년 ${month}월 ${day}일`;
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale?id=${bookId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
        .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            else{
                fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent?id=${bookId}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + getCookie('accessToken'),
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                      return response.json();
                    }
                })
                .catch(error => console(error.message));
            }
        })
        .then(res => {
            setBookInfo(res);
        })    
        .catch(error => console(error.message));
    }, [bookId]);

    const getDirection = () => {
        const mapUrl = `https://map.kakao.com/link/map/${bookInfo.address},${bookInfo.latitude},${bookInfo.longitude}`;
        window.open(mapUrl);
    };


    if (!bookInfo) {
        return <div className='no-book-info'>책 정보가 없습니다.</div>;
    }else {
        return (
            <div className="detail-book-container">
                <div className='user-info-container'>
                    <img src={require('../assets/images/profile-image.png')} alt='' />
                    <div className='wrapper'>
                        <span>한승규</span>
                        <div className='book-status'>판매 중</div>
                    </div>
                </div>
                <div className='book-info-container'>
                    <div className='book-item'>
                        {bookInfo.bookGetRes.img ? (<img src={bookInfo.bookGetRes.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
                        <div className="book-info">
                            <div className="book-title">{bookInfo.bookGetRes.title}</div>
                            <div><span>카테고리</span>
                                {categoryList.find(item => item.name === bookInfo.category)?.label || ''}
                            </div>
                            <div><span>ISBN</span>{bookInfo.bookGetRes.isbn}</div>
                            <div><span>저자</span>{bookInfo.bookGetRes.author.join(' ,')}</div>
                            <div><span>출판사</span>{bookInfo.bookGetRes.publisher}</div>
                            <div><span>출판일</span>{formatDate(bookInfo.bookGetRes.publicationDate)}</div>
                            <div className="book-price-wrapper">
                            <div className="book-sale-price">{bookInfo.salePrice}원</div>
                            <div className="book-price">정가: {bookInfo.bookGetRes.price}원</div>
                            </div>
                            {bookInfo.isSave ? (
                                <img className="heart-icon" src={require("../assets/icons/heart-red.png")} alt="" />
                                ) : (
                                <img className="heart-icon" src={require("../assets/icons/heart-white.png")} alt="" />
                                )}
                            <button className="go-to-chat-btn">채팅하기</button>
                        </div>
                    </div>
                    <div className='condition-image'>
                        <h3>실제 사진</h3>
                        <div className='image-wrapper'>
                            <img src={bookInfo.image} alt='' />
                            <img src={bookInfo.image} alt='' />
                        </div>
                    </div>
                    <div className='condition-container'>
                        <div className='condition-content'>
                            <h3>책 상태</h3>
                            <ConditionRadioList radioEditable={false} handleSelectedConditions={()=>{}} initialConditions={bookInfo.conditions}/>
                        </div>
                        <div className='description-container'>{bookInfo.detail}</div>
                    </div>
                    <div className='address-container'>
                        <h3>거래 장소</h3>
                        <div className='address-container-inner'>
                            <div className='address-wrapper'>
                                <img src={require('../assets/icons/location.png')} alt='' />
                                <span className='address'>{bookInfo.address}</span>
                            </div>
                            <div className='go-to-map-btn' onClick={getDirection}>지도보기
                                <img src={require('../assets/icons/arrow.png')} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
                <CreateBtn />
            </div>
        );
    }
}
export default DetailBook;