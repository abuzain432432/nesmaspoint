import { createSlice } from "@reduxjs/toolkit";

export const model = createSlice({
  name: "model",
  initialState: "",
  reducers: {
    onModelToggle: (state, action) => {
      return action?.payload;
    },
  },
});

export const { onModelToggle } = model.actions;
export default model.reducer;
