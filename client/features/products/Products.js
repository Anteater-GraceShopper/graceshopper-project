import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, fetchProductsAsync } from "./productsSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  return (
    <div>
      {products.map((product) => {
        return (
          <div>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
            <img src={product.imageUrl} alt="image" />
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
