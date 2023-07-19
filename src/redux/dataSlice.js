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
        state.tax[type] += state.data[index].price * state.data[index].gst;
        //optimize
        state.price.total +=
          state.data[index].price * (state.data[index].gst + 1);
      }
    },
    decrement: (state, action) => {
      const index = state.data.findIndex((item) => item.id == action.payload);
      if (state.data[index].count > 0) {
        state.data[index].count--;
        const type = state.data[index].type;
        state.price[type] -= state.data[index].price;
        state.tax[type] -= state.data[index].price * state.data[index].gst;
        //optimize
        state.price.total -=
          state.data[index].price * (state.data[index].gst + 1);
      }
    },
    input: (state, action) => {
      console.time("input");
      const value = parseInt(action.payload.value);
      const index = state.data.findIndex(
        (item) => item.id == action.payload.id
      );
      const prev = state.data[index].count;
      if (state.data[index].stock >= value && value >= 0) {
        const type = state.data[index].type;
        if (!state.price[type]) {
          state.price[type] = 0;
          state.tax[type] = 0;
        }
        state.data[index].count = value;
        //optimize
        state.price[type] += (value - prev) * state.data[index].price;
        state.tax[type] +=
          (value - prev) * state.data[index].price * state.data[index].gst;
        state.price.total +=
          (value - prev) *
          state.data[index].price *
          (state.data[index].gst + 1);
      }
      console.timeEnd("input");
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
