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
    return response.json();
};

export const deleteImageApi = async (deletedImages) => {
    const queryString = deletedImages.map(id => `imageIdList=${id}`).join('&');
    const deleteImgUrl = `${process.env.REACT_APP_API_URL}/api/image?${queryString}`;
    console.log('url: ', deleteImgUrl);
    const response = await fetch(deleteImgUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({ imageIdList: deletedImages })
    });
    if (response.status !== 200) {
        throw new Error('이미지 삭제에 실패했습니다.');
    }
    return;
}