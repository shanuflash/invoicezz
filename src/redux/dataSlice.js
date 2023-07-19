import { supabase } from "@/app/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  let { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });
  if (error) console.log(error);
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    price: {
      total: 0,
    },
    tax: {},
  },
  reducers: {
    increment: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item.stock > item.count) {
        const { type, price, gst } = item;
        item.count++;
        state.price[type] = (state.price[type] ?? 0) + price;
        state.tax[type] = (state.tax[type] ?? 0) + price * gst;
        state.price.total += price * (gst + 1);
      }
    },
    decrement: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item.count > 0) {
        let { type, price, gst } = item;
        item.count--;
        state.price[type] = (state.price[type] ?? 0) - price;
        state.tax[type] = (state.tax[type] ?? 0) - price * gst;
        state.price.total -= price * (gst + 1);
      }
    },
    input: (state, action) => {
      const count = parseInt(action.payload.value);
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item.stock >= count && count >= 0) {
        const { type, price, gst } = item;
        const prev = item.count;
        item.count = count;
        state.price[type] = (state.price[type] ?? 0) + (count - prev) * price;
        state.tax[type] = (state.tax[type] ?? 0) + (count - prev) * price * gst;
        state.price.total += (count - prev) * price * (gst + 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { increment, decrement, input } = dataSlice.actions;

export default dataSlice.reducer;
