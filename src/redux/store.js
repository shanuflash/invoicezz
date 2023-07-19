import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import dataSlice, { fetchData } from "./dataSlice";

export const store = configureStore({
  reducer: {
    form: formSlice,
    data: dataSlice,
  },
});

store.dispatch(fetchData());
