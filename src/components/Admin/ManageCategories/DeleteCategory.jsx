import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../../features/categories/categoriesSlice";
import styles from "../../../styles/Admin.module.css";

const DeleteCategory = () => {
  const dispatch = useDispatch();
  const [deleteCategoryId, setDeleteCategoryId] = useState("");
  const { isLoading, error: deleteError } = useSelector((state) => state.categories);

  const handleDeleteInputChange = (e) => {
    setDeleteCategoryId(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteCategory(deleteCategoryId));
      alert("Category deleted successfully");
      dispatch(getCategories()); // обновить список категорий после удаления
      setDeleteCategoryId(""); // очистить поле после успешного удаления
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div>
      <h2>Delete Category</h2>
      <form className={styles.form} onSubmit={handleDeleteSubmit}>
        <div className={styles.group}>
          <label>
            Id Category to delete:
            <input
              type="text"
              name="id"
              value={deleteCategoryId}
              onChange={handleDeleteInputChange}
            />
          </label>
        </div>
        {deleteError && <p className={styles.error}>{deleteError}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete Category"}
        </button>
      </form>
    </div>
  );
};

export default DeleteCategory;
