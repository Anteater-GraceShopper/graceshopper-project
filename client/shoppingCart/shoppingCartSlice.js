import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  currentOrder: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const fetchCartAsync = createAsyncThunk("cart/fetchAll", async () => {
  try {
    const { data } = await axios.get("/api/cart");
    return data;
  } catch (error) {
    return error.message;
  }
});

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ id, name, price }) => {
    try {
      const { data } = await axios.post("/api/cart", {
        id,
        name,
        price,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteCartProductAsync = createAsyncThunk(
  "cart/deleteProduct",
  async (id, name) => {
    const { data } = await axios.delete(`/api/cart/${id}`, {
      id,
      name,
    });
    return data;
  }
);

export const editCartAsync = createAsyncThunk(
  "cart/editCart",
  async ({ id, quantity }) => {
    try {
      const { data } = await axios.put(`/api/cart/${id}`, {
        quantity,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (id, productId, quantity) => {
    try {
      const { data } = await axios.post(`/api/order/${id}`, {
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.carts;

export default shoppingCartSlice.reducer;
