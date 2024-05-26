import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import createBookReducer from "./slices/createBookSlice";
import bookReducer from "./slices/bookSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        createBook: createBookReducer,
        book: bookReducer,
    },
});

export default store;
