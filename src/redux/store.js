import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import dataSlice from "./dataSlice";
import calcSlice from "./calcSlice";

export const store = configureStore({
  reducer: {
    form: formSlice,
    data: dataSlice,
    // calc: calcSlice,
  },
});
