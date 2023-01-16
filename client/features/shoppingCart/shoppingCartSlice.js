import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchCartAsync = createAsyncThunk("cart/fetchAll", async () => {
//   try {
//     const { data } = await axios.get("/api/cart");
//     return data;
//   } catch (error) {
//     return error.message;
//   }
// });

export const fetchAllOrdersAsync = createAsyncThunk(
  "cart/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/cart");
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchOrderAsync = createAsyncThunk(
  "cart/fetchOrder",
  async ({ orderId }) => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "order/addToCart",
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.put(`/api/order/${userId}/${productId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteCartProductAsync = createAsyncThunk(
  "cart/deleteProduct",
  async (id, product) => {
    const { data } = await axios.delete(`/api/cart/${id}`, {
      product,
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
  async (productId, quantity) => {
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

export const shoppingCartSlice = createSlice({
  name: "carts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCartProductAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.productId != action.payload);
    });
  },
});

export const selectCart = (state) => state.carts;

export default shoppingCartSlice.reducer;
