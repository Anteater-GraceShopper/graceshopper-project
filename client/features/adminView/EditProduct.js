import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editSingleProduct,
  fetchSingleProduct,
  selectSingleProduct,
} from "../products/singleProductSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  const handleNameSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editSingleProduct(name));
    setName("");
  };

  const handlePriceSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editSingleProduct(price));
    setPrice("");
  };

  const handleQuantitySubmit = async (event) => {
    event.preventDefault();
    await dispatch(editSingleProduct(quantity));
    setQuantity("");
  };

  const handleDescriptionSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editSingleProduct(description));
    setDescription("");
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setName(event.target.value);
  };

  const handleQuantity = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h3 className="header" align="center">
        Update {product.name}'s information below:
      </h3>
      <form className="update-form" align="center" onSubmit={handleNameSubmit}>
        <TextField
          className="submission-field"
          label="name"
          value={name}
          onChange={handleName}
          sx={{ bgcolor: "#FFFFFF" }}
        >
          <Button
            variant="contained"
            className="update-button"
            align="center"
            type="submit"
            sx={{ bgcolor: "55828B", width: 150, ml: 1.5 }}
          >
            Update Name
          </Button>
        </TextField>
      </form>
      <form className="update-form" align="center" onSubmit={handlePriceSubmit}>
        <TextField
          className="submission-field"
          label="price"
          value={price}
          onChange={handlePrice}
          sx={{ bgcolor: "#FFFFFF" }}
        >
          <Button
            variant="contained"
            className="update-button"
            align="center"
            type="submit"
            sx={{ bgcolor: "55828B", width: 150, ml: 1.5 }}
          >
            Update Price
          </Button>
        </TextField>
      </form>
      <form
        className="update-form"
        align="center"
        onSubmit={handleQuantitySubmit}
      >
        <TextField
          className="submission-field"
          label="quantity"
          value={quantity}
          onChange={handleQuantity}
          sx={{ bgcolor: "#FFFFFF" }}
        >
          <Button
            variant="contained"
            className="update-button"
            align="center"
            type="submit"
            sx={{ bgcolor: "55828B", width: 150, ml: 1.5 }}
          >
            Update Quantity
          </Button>
        </TextField>
      </form>
      <form
        className="update-form"
        align="center"
        onSubmit={handleDescriptionSubmit}
      >
        <TextField
          className="submission-field"
          label="description"
          value={description}
          onChange={handleDescription}
          sx={{ bgcolor: "#FFFFFF" }}
        >
          <Button
            variant="contained"
            className="update-button"
            align="center"
            type="submit"
            sx={{ bgcolor: "55828B", width: 150, ml: 1.5 }}
          >
            Update Description
          </Button>
        </TextField>
      </form>
    </div>
  );
};

export default EditProduct;
