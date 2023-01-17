import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderAsync = createAsyncThunk(
  "cart/fetchOrder",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/order/${userId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const singleCartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increase: (state, payload) => {
      const cart = state.filter((item) => item.id === payload.id);
      cart.itemCount = cart.itemCount + 1;
    },
    decrease: (state, payload) => {
      const cart = state.filter((item) => item.id === payload.id);
      cart.itemCount = cart.itemCount - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { increase, decrease } = singleCartSlice.actions;
export const selectCart = (state) => state.cart;

export default singleCartSlice.reducer;
