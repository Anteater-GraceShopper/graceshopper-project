import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk(
  "fetchSingleProduct",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editSingleUser = createAsyncThunk(
  "editSingleUser",
  async ({ userId, isAdmin }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {
        isAdmin,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const singleUserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleUser = (state) => {
  return state.user;
};

export default singleUserSlice.reducer;
