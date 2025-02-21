// GetProduct.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../features/products/productsSlice";
import styles from "../../../styles/Admin.module.css";

const GetProduct = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { productDetails, isLoading, error } = useSelector(
    (state) => state.products
  );
  const [productId, setProductId] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleGetProduct = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true);
    try {
      await dispatch(getProductById(productId));
    } catch (error) {
      console.error("Failed to get product", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div>
      <h2>Get Product</h2>
      <form className={styles.form} onSubmit={handleGetProduct}>
        <div className={styles.group}>
          <label>
            Product ID:
            <input
              type="text"
              name="id"
              value={productId}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Get Product</button>
      </form>
      {isLoadingDetails ? (
        <p>Loading...</p>
      ) : error ? (
        error.response && error.response.status === 404 ? (
          <p>Product not found.</p>
        ) : (
          <p>Error: {error.message}</p>
        )
      ) : !productDetails ? (
        <p>Product not found.</p>
      ) : (
        <div className={styles.userData}>
          <p><span className={styles.fieldName}>Name: </span>{productDetails.title}</p>
          <p><span className={styles.fieldName}>Description: </span>{productDetails.description}</p>
          <p><span className={styles.fieldName}>Price: </span>{productDetails.price}$</p>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
