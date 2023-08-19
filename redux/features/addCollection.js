import { createSlice } from "@reduxjs/toolkit";

export const addCollection = createSlice({
  name: "addCollection",
  initialState: { loading: true, data: [] },
  reducers: {
    addData: (state, action) => {
      console.log("********", action);
      return { ...state, data: action.payload };
    },
    startLoading: (state, action) => {
      return { ...state, loading: true };
    },
    finishLoading: (state, action) => {
      return { ...state, loading: false };
    },
  },
});

export const { addData, startLoading, finishLoading } = addCollection.actions;
export default addCollection.reducer;
