import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  invoiceno: "",
  paymed: "",
  payref: "",
  customer_name: "",
  billing_address: "",
  tax_id: "",
  shipping_contact: "",
  shipping_address: "",
  shipping_method: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    empty: () => {
      return initialState;
    },
    change: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { empty, change } = formSlice.actions;

export default formSlice.reducer;
