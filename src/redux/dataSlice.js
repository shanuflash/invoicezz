import { supabase } from "@/app/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) throw error;
    
    return data.map(item => ({ ...item, count: 0 }));
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return rejectWithValue(error.message);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    price: {
      total: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item.stock > item.count) {
        const { price } = item;
        item.count++;
        state.price.total += price;
      }
    },
    decrement: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item.count > 0) {
        const { price } = item;
        item.count--;
        state.price.total -= price;
      }
    },
    input: (state, action) => {
      const count = parseInt(action.payload.value);
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item.stock >= count && count >= 0) {
        const { price } = item;
        const prev = item.count;
        item.count = count;
        state.price.total += (count - prev) * price;
      }
    },
    clear: (state) => {
      state.data.forEach((item) => {
        item.count = 0;
      });
      state.price = {
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increment, decrement, input, clear } = dataSlice.actions;

export default dataSlice.reducer;
