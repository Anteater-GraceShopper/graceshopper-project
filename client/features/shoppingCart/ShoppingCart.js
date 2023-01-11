import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartAsync,
  deleteCartProductAsync,
  selectCart,
} from "./shoppingCartSlice";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import CardMedia from "@mui/material/CardMedia";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

const ShoppingCart = ({ shoppingCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  console.log(cart);
  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);
  return (
    <div className="all-items">
      <h1>Shopping Cart!</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
        }}
      >
        {cart.length < 1 && (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}
        {cart.map((product) => {
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
                  <Link to={`/products/${product.id}`}>
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
                      await dispatch(fetchCartAsync());
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
      <button>Checkout!</button>
    </div>
  );
};

export default ShoppingCart;
