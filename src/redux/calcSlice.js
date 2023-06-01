import { createSlice } from "@reduxjs/toolkit";
import { store } from "./store";

const initialState = {
  price: 0,
  tax: 0,
};

export const calcSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    update: (state, action) => {
      const { data } = store.getState().data;
      data?.forEach((item) => {
        state.price += item.price * item.count;
      });

      // console.log(state.price);

      // setPrice(total);
      // setTax(total * 2 * 0.14);
    },
  },
});

export const { update } = calcSlice.actions;

export default calcSlice.reducer;
