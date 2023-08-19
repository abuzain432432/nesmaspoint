import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./features/adSlice";
import authReducer from "./features/authSlice";
import adsCollection from "./features/addCollection";
import paginationReducer from "./features/paginationSlice";
import searchReducer from "./features/searchSlice";
import modelReducer from "./features/modelSlice";

export const store = configureStore({
  reducer: {
    adsReducer,
    authReducer,
    paginationReducer,
    adsCollection,
    searchReducer,
    modelReducer,
  },
});
