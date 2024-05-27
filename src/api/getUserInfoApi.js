import { getCookie } from "../utils/cookieManage";

export const getUserInfoApi = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth`, {
        headers: {
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        }
    })
    if (response.status !== 200) {
        throw new Error('서버 오류입니다');
    }
    return response.json();
}
