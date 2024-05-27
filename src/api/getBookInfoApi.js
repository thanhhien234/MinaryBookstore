import { getCookie } from '../utils/cookieManage';

export const isbnSearch = async (isbnValue) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book/isbn?isbn=${isbnValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        }
    })
    if (response.status === 404) {
        throw new Error('해당 도서가 없습니다. 다시 입력하세요.');
    }
    else if (response.status !== 200) {
        throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    }
    else {
        return response.json();
    }
};

export const titleSearch = async (titleValue) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book/title?title=${titleValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        }
    })
    if (response.status === 404) {
        throw new Error('해당 도서가 없습니다. 다시 입력하세요.');
    }
    else if (response.status !== 200) {
        throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    }
    else {
        return response.json();
    }
};

export const directInput = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify({
            title: data.title,
            price: data.price,
            author: data.author,
            publisher: data.publisher,
            publicationDate: data.publicationDate,
            isbn: document.getElementById('isbn').value,
        })
    })
    if (response.status !== 200) {
        throw new Error('책 정보를 입력하세요');
    }
    return response.json();
};