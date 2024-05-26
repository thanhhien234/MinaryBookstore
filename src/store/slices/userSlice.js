import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    img: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.img = action.payload.img;
    },
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
