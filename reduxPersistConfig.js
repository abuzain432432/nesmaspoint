import storage from "redux-persist/storages"; // For local storage

// If you are using Immutable.js:
// import { createTransform } from 'redux-persist-transform-immutable';

import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // Key for the persisted data (can be anything you like)
  storage, // Storage mechanism (e.g., local storage)
  whitelist: ["authReducer"], // Specify which reducer(s) to persist
  // If you are using Immutable.js:
  // transforms: [createTransform()],
};

export default persistConfig;
