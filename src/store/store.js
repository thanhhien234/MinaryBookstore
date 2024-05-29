import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import createBookReducer from "./slices/createBookSlice";
import bookReducer from "./slices/bookSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        createBook: createBookReducer,
        book: bookReducer,
        chat: chatReducer
    },
});

export default store;
