import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  img: '',
  chat: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.img = action.payload.img;
      state.chat = action.payload.chat;
    },
    clearChat: (state) => {
      return initialState;
    }
  }
});

export const { setChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
