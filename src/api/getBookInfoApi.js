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