import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './DetailBook.css';
import ConditionRadioList from '../components/ConditionRadioList';
import { getCookie } from '../utils/cookieManage';
import { categoryList, bookStateList } from '../utils/sharedData';
import { setBook, updateBook } from '../store/slices/bookSlice';

function DetailBook() {
    const [loggedIn, setLoggedIn] = useState(null);
    const { bookState, bookId } = useParams();
    const dispatch = useDispatch();
    const bookInfo = useSelector(state => state.book);
    const isSave = useSelector(state => state.book.isSaved);
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log("info", bookInfo);
    // }, [bookInfo]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (getCookie("accessToken")) setLoggedIn(true);
    }, []);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${year}년 ${month}월 ${day}일`;
    };

    useEffect(() => {
        let searchBookUrl;
        if (!bookInfo.startDate)
            searchBookUrl = `${process.env.REACT_APP_API_URL}/api/bookForSale?id=${bookId}`;
        else
            searchBookUrl = `${process.env.REACT_APP_API_URL}/api/bookForRent?id=${bookId}`;

        fetch(searchBookUrl)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                dispatch(setBook(res));
            })
            .catch(error => console.log(error.message));
    }, [bookId, dispatch]);

    const getDirection = () => {
        const mapUrl = `https://map.kakao.com/link/map/${bookInfo.address},${bookInfo.latitude},${bookInfo.longitude}`;
        window.open(mapUrl);
    };

    const postSave = () => {
        if (!loggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
        let saveUrl;
        if (!bookInfo.startDate)
            saveUrl = `${process.env.REACT_APP_API_URL}/api/bookForSale/save?bookForSaleId=${bookId}`;
        else
            saveUrl = `${process.env.REACT_APP_API_URL}/api/bookForRent/save?bookForSaleId=${bookId}`;

        fetch(saveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(updateBook({ isSaved: true }));
                }
            })
            .catch(error => console.log(error.message));
    };

    const deleteSave = () => {
        if (!loggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
        let saveUrl;
        if (!bookInfo.startDate)
            saveUrl = `${process.env.REACT_APP_API_URL}/api/bookForSale/save?bookForSaleId=${bookId}`;
        else
            saveUrl = `${process.env.REACT_APP_API_URL}/api/bookForRent/save?bookForRentId=${bookId}`;

        fetch(saveUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(updateBook({ isSaved: false }));
                }
            })
            .catch(error => console.log(error.message));
    };

    if (!bookInfo || !bookInfo.bookGetRes) {
        return <div className='no-book-info'>책 정보가 없습니다.</div>;
    } else {
        return (
            <div className="detail-book-container">
                <div className='book-owner-container'>
                    <img src={bookInfo.writerImg} alt='' />
                    <div className='wrapper'>
                        <span>{bookInfo.writerName}</span>
                        <div className={`book-status ${bookInfo.state}`}>
                            {bookStateList.find(item => item.name === bookInfo.state)?.label || ''}
                        </div>
                    </div>
                    <p className='create-at'>작성일: {formatDate(bookInfo.createdAt)}</p>
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
                            {isSave ? (
                                <img className="heart-icon" src={require("../assets/icons/heart-red.png")} alt="" onClick={deleteSave} />
                            ) : (
                                <img className="heart-icon" src={require("../assets/icons/heart-white.png")} alt="" onClick={postSave} />
                            )}
                            <button className="go-to-chat-btn" onClick={() => {
                                if (!loggedIn) {
                                    alert('로그인이 필요합니다.');
                                    navigate('/');
                                }
                            }}>채팅하기</button>
                        </div>
                    </div>
                    <div className='condition-image'>
                        <div className='image-wrapper'>
                            {bookInfo.imageList.map((image, index) => (
                                <img key={index} src={image.url} alt='' />
                            ))}
                        </div>
                    </div>
                    <div className='condition-container'>
                        <div className='condition-content'>
                            <h3>책 상태</h3>
                            {bookInfo.conditions.length > 0 && (
                                <ConditionRadioList radioEditable={false} handleSelectedConditions={() => { }} initialConditions={bookInfo.conditions} />
                            )}
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
            </div>
        );
    }
}
export default DetailBook;