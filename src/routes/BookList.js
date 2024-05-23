import './BookList.css';
import { useParams } from 'react-router-dom';
import { getCookie } from '../utils/cookieManage';
import { useEffect, useState } from 'react';
import BookItem from '../components/BookItem';
import { statusList } from './Home';

function BookList() {
    let { status, category } = useParams();
    const [bookList, setBookList] = useState([]);
    let url ='';

    if (status === 'bookForShare') {
        url = `${process.env.REACT_APP_API_URL}/api/bookForSale/share-list?category=${category}`;
    }
    else{
        url = `${process.env.REACT_APP_API_URL}/api/${status}/list?category=${category}`;
    }

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
              return response.json();
            }
            else if (response.status === 404) {
                return [];
            }
        })
        .then(res => {
            setBookList(res);
        })    
        .catch(error => console.log(error));
    }, [url]);

    return (
        bookList.length > 0 ? (
            <div className="book-list-container">
                <div className='book-status'>{statusList.find(item => item.name === status)?.label || ''}</div>
                <ul className="book-list-wrapper">
                    {bookList.map((book, index) => (
                        <BookItem key={index} book={book} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className='no-book-data'>해당 카테고리는 책이 없습니다</div>
        )
        
    );
}

export default BookList;