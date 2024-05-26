import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import createBookReducer from "./slices/createBookSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        createBook: createBookReducer,
    },
});

export default store;
