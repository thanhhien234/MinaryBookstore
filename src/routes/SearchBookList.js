import './BookList.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookItem from '../components/BookItem';
import { getIsbnSearch, getTitleSearch } from '../api/searchBookApi';

function SearchBookList() {
    let { option, input } = useParams();
    const [searchBookList, setSearchBookList] = useState([]);

    const searchIsbn = (isbnInput) => {
        setSearchBookList([]);
        getIsbnSearch(isbnInput, 'bookForSale')
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));

        getIsbnSearch(isbnInput, 'bookForRent')
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));
    }

    const searchTitle = (titleInput) => {
        setSearchBookList([]);
        getTitleSearch(titleInput, 'bookForSale')
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));

        getTitleSearch(titleInput, 'bookForRent')
            .then(res => { setSearchBookList(prevSearchBookList => [...prevSearchBookList, ...res]) })
            .catch(error => console.error(error.message));
    }

    // useEffect(() => {
    //     console.log('search res', searchBookList)
    // }, [searchBookList])

    useEffect(() => {
        if (option === 'isbn') searchIsbn(input);
        else if (option === 'title') searchTitle(input);
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