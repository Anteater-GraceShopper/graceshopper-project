import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllOrdersAsync,
  deleteCartProductAsync,
  addToCartAsync,
  selectCart,
  createOrderAsync,
} from "./shoppingCartSlice";
import { fetchProductsAsync } from "../products/productsSlice";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
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
                  }}
                >
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
                        align="center"
                      >
                        {product.product.name}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {product.product.price}
                    </Typography>
                    <button
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
                    >
                      Delete Item
                    </button>
                  </CardContent>
                </Card>
              </div>
            </>
          );
        })}
      </Grid>

      <Link to="/checkout">

        <button className="button">Checkout</button>

      </Link>
      <Link to="/products">Cancel</Link>
    </div>
  );
};

export default ShoppingCart;
