import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./noteSlice";

export const store = configureStore({
  reducer: {
    noteStore: notesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
