// AddProductForm.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../../features/products/productsSlice";
import styles from "../../../styles/Admin.module.css";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    categoryId: 1,
    images: [""],
  });

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postProduct(productData));
      alert("Product added successfully");
      // Опционально: сбросить форму или выполнить другие действия после успешной отправки
    } catch (error) {
      console.error("Failed to add product", error);
      // Обработка ошибок отправки
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.group}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              required
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
              required
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
              required
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
              required
            />
          </label>
        </div>
        {productData.images.map((image, index) => (
          <div className={styles.group} key={index}>
            <label>
              Image URL {index + 1}:
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(e, index)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddImage}>
          Add Another Image
        </button>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
