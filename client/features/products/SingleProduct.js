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

// import Grid from "@mui/material/Grid";
// import CardMedia from "@mui/material/CardMedia";
// import { CardContent } from "@mui/material";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);
  console.log("USER", user);
  const { name, price, imageUrl, description } = product;
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  return (
    <div className="single-item">
      <div key={productId}>
        <h3>Product Name</h3>
        <p>{name}</p>
        <h3>Product Description</h3>
        <p>{description}</p>
        <h3>Price</h3>
        <p>{price}</p>
        <img src={imageUrl} />
      </div>
      <button
        type="submit"
        onClick={async (evt) => {
          evt.preventDefault();
          await dispatch(addToCartAsync(productId, user.id));
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SingleProduct;
