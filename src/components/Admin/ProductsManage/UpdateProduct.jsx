// UpdateProduct.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../features/products/productsSlice";
import styles from "../../../styles/Admin.module.css";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { productDetails, isLoading, error } = useSelector(
    (state) => state.products
  );
  const [productData, setProductData] = useState({
    id: "",
    title: "",
    description: "",
    price: 0,
    categoryId: 1,
    images: [""],
  });
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === "categoryId" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e, index) => {
    const images = [...productData.images];
    images[index] = e.target.value;
    setProductData({ ...productData, images });
  };

  const handleAddImage = () => {
    setProductData({ ...productData, images: [...productData.images, ""] });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct(productData));
      alert("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const handleGetProduct = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true);
    try {
      await dispatch(getProductById(productData.id));
    } catch (error) {
      console.error("Failed to get product", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (productDetails) {
      setProductData({
        id: productDetails.id || "",
        title: productDetails.title || "",
        description: productDetails.description || "",
        price: productDetails.price || 0,
        categoryId: productDetails.categoryId || 1,
        images: productDetails.images || [""],
      });
    }
  }, [productDetails]);

  return (
    <div>
      <h2>Update Product</h2>
      <form className={styles.form} onSubmit={handleUpdateFormSubmit}>
        <div className={styles.group}>
          <label>
            Product ID:
            <input
              type="text"
              name="id"
              value={productData.id}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleGetProduct}>
            Load Product Details
          </button>
        </div>
        {isLoadingDetails ? (
        <p>Loading...</p>
      ) : error ? (
        error.response && error.response.status === 404 ? (
          <p>Product not found.</p>
        ) : (
          <p>
            Error:{" "}
            {error.message ||
              "Error occurred while fetching product details."}
          </p>
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
        <div className={styles.group}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.group}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.group}>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.group}>
          <label>
            Category:
            <input
              type="number"
              name="categoryId"
              value={productData.categoryId}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {productData.images.map((image, index) => (
          <div className={styles.group} key={index}>
            <label>
              Image URL:
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddImage}>
          Add Another Image
        </button>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
