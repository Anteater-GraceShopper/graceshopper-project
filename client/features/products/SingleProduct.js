import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { me } from "../auth/authSlice";
import { addToCartAsync } from "../shoppingCart/shoppingCartSlice";
import { addProductAsync } from "./productsSlice";
import {
  addSingleProduct,
  fetchSingleProduct,
  selectSingleProduct,
} from "./singleProductSlice";
import EditProduct from "../adminView/EditProduct";

import {
  CardActions,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);

  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  const { name, price, imageUrl, description } = product;
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  return (
    <div className="single-item">
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
          mt: 30,
        }}
      >
        <Card raised sx={{ width: 600, height: 850, ml: 10, mt: 8 }}>
          <div key={productId}>
            <CardMedia
              component="img"
              image={imageUrl}
              height="600"
              width="600"
            />
            <CardContent align="center">
              <Typography variant="h5" align="center">
                Name
              </Typography>
              <Typography variant="p" align="center">
                {name}
              </Typography>
              <Typography variant="h5" align="center">
                Description
              </Typography>
              <Typography variant="p" align="center">
                {description}
              </Typography>
              <Typography variant="h5" align="center">
                Price
              </Typography>
              <Typography variant="p" align="center">
                ${price}
              </Typography>
            </CardContent>
          </div>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Button
              type="submit"
              justifyContent="center"
              display="flex"
              onClick={async (evt) => {
                evt.preventDefault();
                await dispatch(addToCartAsync({ userId, productId }));
              }}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>

        {isAdmin ? (
          <Card raised sx={{ width: 500, height: 500, ml: 10, mt: 8 }}>
            <EditProduct />
          </Card>
        ) : null}
      </Grid>
    </div>
  );
};

export default SingleProduct;
