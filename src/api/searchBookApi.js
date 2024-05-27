export const getIsbnSearch = async (isbnInput, option) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${option}/search-isbn?isbn=${isbnInput}`)
    if (response.status !== 200) {
        throw new Error('이미지 업로드에 실패했습니다.');
    }
    return response.json();
}

export const getTitleSearch = async (titleInput, option) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${option}/search-title?title=${titleInput}`)
    if (response.status !== 200) {
        throw new Error('이미지 업로드에 실패했습니다.');
    }
    return response.json();
}