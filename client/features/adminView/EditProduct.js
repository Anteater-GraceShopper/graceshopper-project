import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSingleProduct } from "../products/singleProductSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const priceHandler = (event) => {
    setName(event.target.value);
  };

  const quantityHandler = (event) => {
    setName(event.target.value);
  };

  const imageHandler = (event) => {
    setImageUrl(event.target.value);
  };

  const descriptionHandler = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      editSingleProduct({
        productId,
        name,
        price,
        quantity,
        description,
        imageUrl,
      })
    );
    setName("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
    setDescription("");
    navigate("/products");
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <label align="center" className="header">
          Edit product
        </label>
        <form align="center" className="form" onSubmit={handleSubmit}>
          <Grid
            item
            sx={{
              mt: 2,
            }}
          >
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              label="Product Name"
              value={name}
              onChange={nameHandler}
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}
          >
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              label="Price"
              value={price}
              onChange={priceHandler}
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}
          >
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Product Quantity"
              value={quantity}
              onChange={quantityHandler}
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}
          >
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              label="Image URL"
              value={imageUrl}
              onChange={imageHandler}
            />
          </Grid>
          <Grid>
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              label="Description"
              value={description}
              onChange={descriptionHandler}
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}
          >
            <Button variant="contained" className="submit-button" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default EditProduct;
