import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProductAsync,
  selectOrder,
  fetchOrderAsync,
} from "./shoppingCartSlice";
import { useParams } from "react-router-dom";
import { Checkout } from "../checkout/Checkout";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import CardMedia from "@mui/material/CardMedia";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  // const { orderId } = useParams();
  const order = useSelector(selectOrder);
  //   const user = useSelector((state) => state.auth.me);
  // const userId = user.id;
  const orderId = order.id;
  console.log(orderId);
  console.log(order);
  useEffect(() => {
    dispatch(fetchOrderAsync(orderId));
  }, [dispatch, orderId]);
  return (
    <div className="all-items">
      <h1>Shopping Cart</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
        }}
      >
        {order.length < 1 && (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}
        {order.map((product) => {
          return (
            <div key={product.id}>
              <Card
                raised
                sx={{
                  width: 280,
                  ml: 10,
                  mb: 3,
                  padding: "0.1em",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.imageUrl}
                  height="300"
                  width="300"
                />
                <CardContent>
                  <Link to={`/products/${product.productId}`}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {product.price}
                  </Typography>
                  <button
                    type="delete"
                    onClick={async (evt) => {
                      evt.preventDefault();
                      await dispatch(
                        deleteCartProductAsync(
                          product.id,
                          product.name,
                          product.price
                        )
                      );
                      await dispatch(fetchOrderAsync(orderId));
                    }}
                  >
                    Delete Item
                  </button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Grid>

      <Link to="/checkout">
        <button
          className="button"
          // onClick={async (evt) => {
          //   evt.preventDefault();
          //   await dispatch(createOrderAsync(cart));
          // }}
        >
          Checkout
        </button>
      </Link>
      <Link to="/products">Cancel</Link>
    </div>
  );
};

export default ShoppingCart;
