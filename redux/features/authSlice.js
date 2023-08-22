import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    register: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...action.payload };
    },
    login: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...action.payload };
    },
    logout: (state, action) => {
      localStorage.removeItem("auth");
      return {};
    },
    activate: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...action.payload };
    },
  },
});

export const { register, login, logout, activate } = auth.actions;
export default auth.reducer;
