import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../products/productsSlice";
import { TextField, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };
  const imageHandler = (event) => {
    setImageUrl(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      addProductAsync({
        name,
        price,
        quantity,
        imageUrl,
        description,
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
        sx={{
          mt: 2,
        }}>
        <label align="center" className="header">
          Add a new product
        </label>
        <form align="center" className="add-form" onSubmit={handleSubmit}>
          <Grid
            item
            sx={{
              mt: 2,
            }}>
            <TextField
              sx={{
                input: {
                  bgcolor: "white",
                },
              }}
              label="Product Name"
              value={name}
              onChange={nameHandler}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}>
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
            }}>
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
            }}>
            <TextField
              sx={{ input: { bgcolor: "white" } }}
              label="Image URL"
              value={imageUrl}
              onChange={imageHandler}
            />
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
            }}>
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
            }}>
            <Button variant="contained" className="submit-button" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default AddProduct;
