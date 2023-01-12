import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EditProduct from "../features/adminView/EditProduct";
import AuthForm from "../features/auth/AuthForm";
import Checkout from "../features/checkout/Checkout";
import Home from "../features/home/Home";
import Products from "../features/products/Products";
import SingleProduct from "../features/products/SingleProduct";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import AddProduct from "../features/adminView/AddProduct";
import AllUsers from "../features/adminView/AllUsers";
import SingleUser from "../features/adminView/SingleUser";
import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:userId" element={<SingleUser />} />
        </Routes>
      ) : isLoggedIn ? (
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
