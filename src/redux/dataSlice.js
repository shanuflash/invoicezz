import { supabase } from "@/app/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchTodos", async () => {
  let { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    price: 0,
    tax: 0,
  },
  reducers: {
    increment: (state, action) => {
      const index = state.data.findIndex((item) => item.id == action.payload);
      if (state.data[index].stock > state.data[index].count) {
        state.data[index].count++;
        state.price += state.data[index].price;
        state.tax = state.price * 0.14;
      }
    },
    decrement: (state, action) => {
      const index = state.data.findIndex((item) => item.id == action.payload);
      if (state.data[index].count > 0) {
        state.data[index].count--;
        state.price -= state.data[index].price;
        state.tax = state.price * 0.14;
      }
    },
    input: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id == action.payload.id
      );
      const prev = state.data[index].count;
      if (
        state.data[index].stock >= action.payload.value &&
        action.payload.value >= 0
      ) {
        state.data[index].count = action.payload.value;
        state.price += (action.payload.value - prev) * state.data[index].price;
        state.tax = state.price * 0.14;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    });
  },
});

export const { increment, decrement, input } = dataSlice.actions;

export default dataSlice.reducer;
