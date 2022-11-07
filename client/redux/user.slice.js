import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    name: null,
    phone: null,
    files: [1, 2, 3, 4, 5, 6],
  },
  reducers: {
    setUser: (state, { payload }) => {
      const { name, email, phone, files } = payload || {};
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.files = files;
    },
    setMyImages: (state, { payload }) => {
      console.log(payload);
      state.files = payload;
    },
  },
});

export default userSlice.reducer;
export const { setMyImages, setUser } = userSlice.actions;
