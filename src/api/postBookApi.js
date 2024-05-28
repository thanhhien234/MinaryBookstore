import { getCookie } from '../utils/cookieManage';

export const postBookApi = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify(data)
    })
    if (response.status !== 200) {
        throw new Error('서버 오류입니다');
    }
    else {
        alert('책 정보가 등록되었습니다.');
    }
    return;
};
