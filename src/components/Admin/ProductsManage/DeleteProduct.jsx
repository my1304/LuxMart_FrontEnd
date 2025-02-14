// DeleteProduct.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../../../features/products/productsSlice";
import styles from "../../../styles/Admin.module.css";

const DeleteProduct = () => {
  const dispatch = useDispatch();
  const [deleteProductId, setDeleteProductId] = useState("");

  const handleDeleteInputChange = (e) => {
    setDeleteProductId(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteProduct(deleteProductId));
      alert("Product deleted successfully");
      dispatch(getProducts()); // обновить список продуктов после удаления
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form className={styles.form} onSubmit={handleDeleteSubmit}>
        <div className={styles.group}>
          <label>
            Id Product to delete:
            <input
              type="text"
              name="id"
              value={deleteProductId}
              onChange={handleDeleteInputChange}
            />
          </label>
        </div>
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
