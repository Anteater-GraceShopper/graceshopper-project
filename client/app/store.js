import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";

import shoppingCartReducer from "../features/shoppingCart/shoppingCartSlice";
import usersReducer from "../features/adminView/usersSlice";
import singleProductReducer from "../features/products/singleProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    carts: shoppingCartReducer,
    users: usersReducer,
    product: singleProductReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
