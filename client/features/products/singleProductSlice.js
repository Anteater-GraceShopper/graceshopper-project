import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (productId) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editSingleProduct = createAsyncThunk(
  "editSingleProduct",
  async ({ productId, name, description, quantity, price, imageUrl }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        name,
        description,
        quantity,
        price,
        imageUrl,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const singleProductSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.product;
};

export default singleProductSlice.reducer;
