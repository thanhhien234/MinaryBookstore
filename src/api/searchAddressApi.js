export const searchAddressApi = async (addressInput) => {
    if (addressInput === '') {
        alert('장소를 입력하세요.');
        return;
    }
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(addressInput)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    }
    return response.json();
};
