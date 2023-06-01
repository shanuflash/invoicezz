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
  initialState: [],
  reducers: {
    increment: (state, action) => {
      const index = state.findIndex((item) => item.id == action.payload);
      if (state[index].stock > state[index].count) state[index].count++;
    },
    decrement: (state, action) => {
      const index = state.findIndex((item) => item.id == action.payload);
      if (state[index].count > 0) state[index].count--;
    },
    input: (state, action) => {
      const index = state.findIndex((item) => item.id == action.payload.id);
      if (
        state[index].stock >= action.payload.value &&
        action.payload.value >= 0
      )
        state[index].count = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { increment, decrement, input } = dataSlice.actions;

export default dataSlice.reducer;
