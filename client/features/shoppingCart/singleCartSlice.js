import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrderAsync = createAsyncThunk(
  "cart/fetchOrder",
  async (orderId) => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const singleCartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;

export default singleCartSlice.reducer;