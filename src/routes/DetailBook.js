import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailBook.css'
import { bookList, userInfo } from './data'; //sample data
import BookItem from '../components/BookItem';
import CreateBtn from '../components/CreateBtn';
import ConditionRadioList from '../components/ConditionRadioList';

function DetailBook() {
    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState(null);

    useEffect(() => {
        setBookInfo(bookList[bookId]);
    }, [bookId]);

    if (!bookInfo) {
        return <div>책 정보가 없습니다.</div>;
    }else {
        return (
            <div className="detail-book-container">
                <div className='user-info-container'>
                    <img src={userInfo.image} alt='' />
                    <div className='wrapper'>
                        <span>{userInfo.name}</span>
                        <div className='book-status'>판매 중</div>
                    </div>
                </div>
                <div className='book-info-container'>
                    <BookItem book={bookInfo} />
                    <div className='condition-container'>
                        <div className='condition-image'>
                            <span>실제 사진</span>
                            <div className='image-wrapper'>
                                <img src={bookInfo.image} alt='' />
                                <img src={bookInfo.image} alt='' />
                            </div>
                        </div>
                        <div className='condition-content'>
                            <span>책 상태</span>
                            <ConditionRadioList radioEditable={false}/>
                        </div>
                    </div>
                    <div className='description-container'>책이 깨끗합니다. 페이지에는 몇 군데 필기가 있지만 크게 방해되지 않는 수준입니다. 책 표지와 페이지 모서리에는 약간의 자연스러운 착용 흔적이 있지만 큰 훼손은 없습니다.</div>
                    <div className='address-container-title'>거래 장소</div>
                    <div className='address-container'>
                        <div className='address-wrapper'>
                            <img src={require('../assets/icons/location.png')} alt='' />
                            <span className='address'>대구 북구 대학로 3길13</span>
                        </div>
                        <div className='go-to-map-btn'>지도보기
                            <img src={require('../assets/icons/arrow.png')} alt='' />
                        </div>
                    </div>
                </div>
                <CreateBtn />
            </div>
        );
    }
}
export default DetailBook;