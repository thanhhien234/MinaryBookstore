import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  img: '',
  content: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      const { id, name, img, content } = action.payload;
      state.id = id;
      state.name = name;
      state.img = img;
      state.content = content;
    },
    clearChat: (state) => {
      return initialState;
    }
  }
});

export const { setChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
