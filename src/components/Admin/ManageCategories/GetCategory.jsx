import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../../features/categories/categoriesSlice";
import styles from "../../../styles/Admin.module.css";

const GetCategory = () => {
  const dispatch = useDispatch();
  const { categoryDetails, isLoading, error } = useSelector( // eslint-disable-line no-unused-vars
    (state) => state.categories
  );
  const [categoryId, setCategoryId] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleInputChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleGetCategory = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true);
    try {
      await dispatch(getCategoryById(categoryId));
    } catch (error) {
      console.error("Failed to get category", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div>
      <h2>Get Category</h2>
      <form className={styles.form} onSubmit={handleGetCategory}>
        <div className={styles.group}>
          <label>
            Category ID:
            <input
              type="text"
              name="id"
              value={categoryId}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Get Category</button>
      </form>
      {isLoadingDetails ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !categoryDetails ? (
        <p>Category not found.</p>
      ) : (
        <div className={styles.userData}>
          <p><span className={styles.fieldName}>Name: </span>{categoryDetails.name}</p>
          <p><span className={styles.fieldNameImage}>Image: </span><img src={categoryDetails.image} alt={categoryDetails.name} className={styles.image} /></p>
        </div>
      )}
    </div>
  );
};

export default GetCategory;
