import { createSlice } from "@reduxjs/toolkit";

export const ads = createSlice({
  name: "pagination",
  initialState: { page: 1 },
  reducers: {
    paginate: (state, action) => {
      if (action.payload === 1) {
        return { page: state.page + 1 };
      } else {
        return { page: state.page - 1 };
      }
    },
    resetPagination: (state, action) => {
      return { page: 1 };
    },
  },
});

export const { paginate, resetPagination } = ads.actions;
export default ads.reducer;
