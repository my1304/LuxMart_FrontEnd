import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../features/categories/categoriesSlice";
import styles from "../../../styles/Admin.module.css";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCategory(categoryData));
      alert("Category added successfully");
      // Опционально: сбросить форму или выполнить другие действия после успешной отправки
    } catch (error) {
      console.error("Failed to add category", error);
      // Обработка ошибок отправки
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.group}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
              required
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
              required
            />
          </label>
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
