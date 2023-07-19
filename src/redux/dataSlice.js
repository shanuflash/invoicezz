import { supabase } from "@/app/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
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
    price: {
      total: 0,
    },
    tax: {},
  },
  reducers: {
    increment: (state, action) => {
      const index = state.data.findIndex((item) => item.id == action.payload);
      if (state.data[index].stock > state.data[index].count) {
        state.data[index].count++;
        const type = state.data[index].type;
        if (!state.price[type]) {
          state.price[type] = 0;
          state.tax[type] = 0;
        }
        state.price[type] += state.data[index].price;
        state.price.total += state.data[index].price;
        // state.tax[type] += state.price[type] * state.data[index].tax;
      }
    },
    decrement: (state, action) => {
      const index = state.data.findIndex((item) => item.id == action.payload);
      if (state.data[index].count > 0) {
        state.data[index].count--;
        const type = state.data[index].type;
        state.price[type] -= state.data[index].price;
        state.price.total -= state.data[index].price;
        // tax
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
        // state.price += (action.payload.value - prev) * state.data[index].price;
        // state.tax = state.price * 0.14;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const setupStore = () => {
  const store = configureStore({
    reducer: dataSlice.reducer,
  });
  store.dispatch(fetchData());
  return store;
};

export const { increment, decrement, input } = dataSlice.actions;

export default dataSlice.reducer;
