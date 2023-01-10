import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async ({ name, price, quantity, description, imageUrl }) => {
    try {
      const { data } = await axios.post("/api/products", {
        name,
        price,
        quantity,
        description,
        imageUrl,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (id, name, description, imageUrl) => {
    const { data } = await axios.delete(`/api/products/${id}`, {
      id,
      name,
      price,
      quantity,
      description,
      imageUrl,
    });
    return data;
  }
);

export const campusesSlice = createSlice({
  name: "campuses",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampusesAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCampusesAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectCampuses = (state) => state.campuses;

export default campusesSlice.reducer;
