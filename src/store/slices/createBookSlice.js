import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookInfo: null,
    addressList: [0],
    selectedAddress: null,
    data: {
        bookId: null,
        conditions: [1, 1, 1, 1, 1, 1],
        detail: '',
        salePrice: null,
        category: '',
        longitude: null,
        latitude: null,
        address: '',
        startDate: '',
        endDate: ''
    }
};

const createBookSlice = createSlice({
    name: 'createBook',
    initialState,
    reducers: {
        setBookInfo: (state, action) => {
            state.bookInfo = action.payload;
            if (action.payload !== null) {
                state.data.bookId = action.payload.id;
            }
        },
        setAddressList: (state, action) => {
            state.addressList = action.payload;
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
            state.data.longitude = parseFloat(action.payload.x);
            state.data.latitude = parseFloat(action.payload.y);
            state.data.address = action.payload.address_name;
        },
        updateData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
    }
});

export const {
    setBookInfo,
    setAddressList,
    setSelectedAddress,
    updateData
} = createBookSlice.actions;

export default createBookSlice.reducer;
