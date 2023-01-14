import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderAsync,
  selectOrder,
  deleteCartProductAsync
 } from "../shoppingCart/shoppingCartSlice";
 import { selectSingleUser } from "../adminView/singleUserSlice";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);
  const cart = useSelector(selectOrder)

console.log(user, "HELLO")
console.log(cart)

  useEffect(() => {
    dispatch(fetchOrderAsync());
  }, [dispatch]);
  console.log(user)
  console.log(cart)

  const cartTotal = () => {
    let total = 0;
    return total
  }

  return (
<div className="all-items">
      <h1>Review Items for Checkout</h1>
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
                      await dispatch(fetchOrderAsync());
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
      <Link to='/orderconfirmation'>
      <button
        class="button"
      >Purchase
      </button>
      </Link>
      <Link to="/cart">Cancel</Link>
    </div>
  );
};

export default Checkout;
