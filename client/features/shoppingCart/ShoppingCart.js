import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllOrdersAsync,
  deleteCartProductAsync,
  selectCart,
} from "./shoppingCartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";

import {
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Card,
  Grid,
  Tooltip,
  Button,
  Box,
} from "@mui/material";

import { fetchProductsAsync } from "../products/productsSlice";

const ShoppingCart = ({ shoppingCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const products = useSelector((state) => state.products);
  const cartId = useParams();

  useEffect(
    (cartId) => {
      dispatch(fetchAllOrdersAsync(cartId));
      dispatch(fetchProductsAsync());
    },
    [dispatch]
  );
  useEffect(() => {}, [dispatch]);

  return (
    <div className="all-items">
      <h1>Shopping Cart</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
        }}>
        {cart.length < 1 && (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}

        {cart.map((product) => {
          {
            console.log(product.product);
          }
          return (
            <>
              <div key={product.productId}>
                <Card
                  raised
                  sx={{
                    width: 280,
                    ml: 10,
                    mb: 3,
                    padding: "0.1em",
                  }}>
                  <CardMedia
                    component="img"
                    image={product.product.imageUrl}
                    height="300"
                    width="300"
                  />
                  <CardContent>
                    <Link to={`/products/${product.productId}`}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center">
                        {product.product.name}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center">
                      {product.product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center">
                      {product.itemCount}
                    </Typography>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}>
                      <Tooltip title="Remove from cart">
                        <DeleteIcon
                          type="delete"
                          onClick={async (evt) => {
                            evt.preventDefault();
                            await dispatch(
                              deleteCartProductAsync(
                                product.product.id,
                                product.product.name
                              )
                            );
                            await dispatch(fetchAllOrdersAsync());
                          }}
                        />
                      </Tooltip>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            </>
          );
        })}
      </Grid>

      <Link to="/checkout">
        <div className="checkout-button">
          <Button
            align="center"
            variant="contained"
            sx={{
              bgcolor: "#28536B",
              "&:hover": {
                bgcolor: "#598588",
              },
            }}>
            Checkout
          </Button>
        </div>
      </Link>

      <Link to="/products">
        <div className="continue-shopping">
          <Button
            align="center"
            variant="contained"
            sx={{
              bgcolor: "#28536B",
              "&:hover": {
                bgcolor: "#598588",
              },
            }}>
            Continue Shopping
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
