import { getCookie } from '../utils/cookieManage';

export const getInterestBookApi = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book/save`, {
        headers: { 'Authorization': 'Bearer ' + getCookie('accessToken') }
    })
    if (response.status !== 200) {
        throw new Error('서버 오류');
    }
    return response.json();
};

