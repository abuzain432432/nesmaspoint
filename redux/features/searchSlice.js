import { createSlice } from "@reduxjs/toolkit";

export const search = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    onSearchChange: (state, action) => {   
      return action?.payload;
    },
    
  },
});

export const { onSearchChange } = search.actions;
export default search.reducer;
