import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";

import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActions } from "@mui/material";
import {
  deleteProductAsync,
  fetchProductsAsync,
  selectProducts,
} from "./productsSlice";
import Grid from "@mui/material/Grid";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  return (
    <div className="all-items">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "center",
        }}>
        {products && products.length
          ? products.map((product) => {
              return (
                <div key={product.id}>
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
                      image={product.imageUrl}
                      height="300"
                      width="300"
                    />
                    <CardContent>
                      <Link to={`/products/${product.id}`}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center">
                          {product.name}
                        </Typography>
                      </Link>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center">
                        {product.price}
                      </Typography>
                    </CardContent>

                    {isAdmin ? (
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}>
                        <DeleteIcon
                          onClick={() =>
                            dispatch(deleteProductAsync(product.id))
                          }
                        />
                      </CardActions>
                    ) : null}
                  </Card>
                </div>
              );
            })
          : null}
      </Grid>
    </div>
  );
};

export default Products;
