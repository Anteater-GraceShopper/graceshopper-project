import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartAsync,
  fetchAllOrdersAsync,
  selectCart,
  deleteCartProductAsync,
} from "../shoppingCart/shoppingCartSlice";
import { selectSingleUser } from "../adminView/singleUserSlice";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Button, Tooltip, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);
  const cart = useSelector(selectCart);
  const cartId = cart.id;

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(cartId));
  }, [dispatch, cartId]);

  const cartTotal = () => {
    let total = 0;
    return total;
  };

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
                            deleteCartProductAsync(
                              product.product.id,
                              product.product.name
                            )
                          );
                          await dispatch(fetchCartAsync());
                        }}
                      />
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Grid>
      <Link to="/orderconfirmation">
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
            Purchase
          </Button>
        </div>
      </Link>
      <Link to="/cart">
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
            Cancel
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Checkout;
