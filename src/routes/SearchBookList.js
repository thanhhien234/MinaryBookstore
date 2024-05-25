import './BookList.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookItem from '../components/BookItem';

function SearchBookList() {
    let { option, input } = useParams();
    const [searchBookList, setSearchBookList] = useState([]);

    const getIsbnSearch = (isbnInput) => {
        setSearchBookList([]);
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/search-isbn?isbn=${isbnInput}`)
            .then(response => {
                if (response.status === 200) return response.json();
            })
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));

        fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent/search-isbn?isbn=${isbnInput}`)
            .then(response => {
                if (response.status === 200) return response.json();
            })
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));
    }

    const getTitleSearch = (titleInput) => {
        setSearchBookList([]);
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/search-title?title=${titleInput}`)
            .then(response => {
                if (response.status === 200) return response.json();
            })
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));

        fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent/search-title?title=${titleInput}`)
            .then(response => {
                if (response.status === 200) return response.json();
            })
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));
    }

    useEffect(() => {
        console.log('search res', searchBookList)
    }, [searchBookList])

    useEffect(() => {
        if (option === 'isbn') getIsbnSearch(input);
        else if (option === 'title') getTitleSearch(input);
    }, [option, input])

    return (
        searchBookList.length > 0 ? (
            <div className="book-list-container">
                <ul className="book-list-wrapper">
                    {searchBookList.map((book, index) => (
                        <BookItem key={index} book={book} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className='no-book-data'>책 정보가 없습니다</div>
        )

    );
}

export default SearchBookList;