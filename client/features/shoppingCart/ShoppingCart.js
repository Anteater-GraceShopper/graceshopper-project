import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../auth/authSlice";
import { deleteCartProductAsync } from "./shoppingCartSlice";
import {
  decrease,
  fetchOrderAsync,
  increase,
  selectCart,
} from "./singleCartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { id } = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrderAsync(id));
  }, [dispatch, id]);

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
        {cart.length < 1 && (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}

        {cart.length ? (
          cart.map((product) => {
            {
              console.log(product.product);
            }
            return (
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
                    image={product.imageUrl}
                    height="300"
                    width="300"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      <button
                        onClick={() => {
                          dispatch(decrease(product.cart.itemCount));
                        }}
                      >
                        -
                      </button>
                      <span> </span>
                      {product.cart.itemCount}
                      <span> </span>
                      <button
                        onClick={() => {
                          dispatch(increase(product.cart.itemCount));
                        }}
                      >
                        +
                      </button>
                    </Typography>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Tooltip title="Remove from cart">
                        <DeleteIcon
                          type="delete"
                          onClick={async (evt) => {
                            evt.preventDefault();
                            await dispatch(
                              deleteCartProductAsync(product.id, product.name)
                            );
                            await dispatch(fetchOrderAsync(id));
                          }}
                        />
                      </Tooltip>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            );
          })
        ) : (
          <div>
            <h2>Cart is empty!</h2>
          </div>
        )}
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
            }}
          >
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
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
