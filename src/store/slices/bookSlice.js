import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    bookGetRes: {
        id: null,
        title: '',
        price: null,
        author: [],
        publisher: '',
        publicationDate: '',
        isbn: '',
        img: ''
    },
    conditions: [],
    imageList: [],
    detail: '',
    salePrice: null,
    category: '',
    address: '',
    longitude: null,
    latitude: null,
    startDate: '',
    endDate: '',
    editable: false,
    state: '',
    isSaved: false,
    createdAt: ''
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateBook: (state, action) => {
            return { ...state, ...action.payload };
        },
    }
});

export const { setBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
