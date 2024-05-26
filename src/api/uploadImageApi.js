import { getCookie } from '../utils/cookieManage';

export const uploadImageApi = async (images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
        formData.append('multipartFileList', image.fileObject);
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/image`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: formData
    })
    if (response.status !== 200) {
        throw new Error('이미지 업로드에 실패했습니다.');
    }
    return response.json();
};