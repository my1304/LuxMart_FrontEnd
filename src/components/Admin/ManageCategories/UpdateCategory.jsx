import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById, updateCategory } from "../../../features/categories/categoriesSlice";
import styles from "../../../styles/Admin.module.css";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const { categoryDetails, isLoading, error } = useSelector(   // eslint-disable-line no-unused-vars
    (state) => state.categories
  );
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    image: "",
  });
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCategory(categoryData));
      alert("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const handleGetCategory = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true);
    try {
      await dispatch(getCategoryById(categoryData.id));
    } catch (error) {
      console.error("Failed to get category", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (categoryDetails) {
      setCategoryData({
        id: categoryDetails.id || "",
        name: categoryDetails.name || "",
        image: categoryDetails.image || "",
      });
    }
  }, [categoryDetails]);

  return (
    <div>
      <h2>Update Category</h2>
      <form className={styles.form} onSubmit={handleUpdateFormSubmit}>
        <div className={styles.group}>
          <label>
            Category ID:
            <input
              type="text"
              name="id"
              value={categoryData.id}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleGetCategory}>
            Load Category Details
          </button>
        </div>
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
        <div className={styles.group}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.group}>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={categoryData.image}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
