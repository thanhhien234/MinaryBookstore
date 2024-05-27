
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './HistoryBookItem.css';
import { getCookie } from '../utils/cookieManage';
import { bookStateList } from '../utils/sharedData';


function HistoryBookItem({ book, option }) {
    const [optionOpen, setOptionOpen] = useState(false);
    const navigate = useNavigate();
    const deleteBook = (id) => {
        let url;
        if (option === 'sale-tab') url = `${process.env.REACT_APP_API_URL}/api/bookForSale?id=${id}`;
        else url = `${process.env.REACT_APP_API_URL}/api/bookForRent?id=${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + getCookie('accessToken') }
        })
            .then(response => {
                if (response.status === 200) {
                    alert('책 삭제되었습니다.');
                } else {
                    throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
                }
            })
            .catch(error => alert(error.message));
    }
    const soldBook = (id) => {
        let url;
        if (option === 'sale-tab') url = `${process.env.REACT_APP_API_URL}/api/bookForSale/sold?bookForSaleId=${id}`;
        else url = `${process.env.REACT_APP_API_URL}/api/bookForRent/sold?bookForRentId=${id}`;
        fetch(url, {
            method: 'PATCH',
            headers: { Authorization: 'Bearer ' + getCookie('accessToken') }
        })
            .then(response => {
                if (response.status === 200) {
                    alert('책 상태가 변경되었습니다.');
                } else {
                    throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
                }
            })
            .catch(error => alert(error.message));
    }
    return (
        <li className="history-item">
            <img className="history-book-img" src={book.bookGetRes.img} alt='' />
            <div className="history-book-info">
                <div className="history-book-title">{book.bookGetRes.title}</div>
                <div className="history-book-price">{book.salePrice}원</div>
                <div className={`history-book-status ${book.state}`}>
                    {bookStateList.find(item => item.name === book.state)?.label || ''}
                </div>
            </div>
            <img className="option" src={require('../assets/icons/option.png')} alt='' onClick={() => setOptionOpen(!optionOpen)} />
            {optionOpen &&
                <ul className="option-box">
                    {book.state !== 'RENT' && book.state !== 'SOLD' && (
                        <li className="option-item" onClick={() => {
                            navigate(`/edit-book/${option.slice(0, 4)}/${book.id}`);
                            setOptionOpen(false);
                        }}>수정</li>
                    )}

                    <li className="option-item" onClick={() => {
                        deleteBook(book.id);
                        setOptionOpen(false);
                    }}>삭제</li>
                    {book.state !== 'RENT' && book.state !== 'SOLD' && (
                        <li className="option-item" onClick={() => {
                            soldBook(book.id);
                            setOptionOpen(false);

                        }}>{option === "sale-tab" ? '거래완료' : '대여와료'}</li>
                    )}
                </ul>
            }
        </li>
    );
}
export default HistoryBookItem;