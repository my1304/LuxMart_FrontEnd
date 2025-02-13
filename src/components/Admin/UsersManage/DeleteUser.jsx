// DeleteUser.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../features/user/userSlice";

import styles from "../../../styles/Admin.module.css";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(""); // Состояние для хранения ID пользователя
  const [error, setError] = useState(null);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(deleteUser(userId)).unwrap();
      if (!response) {
        setError("User not found");
      } else {
        alert("User deleted successfully");
        setUserId(""); // Сброс ID пользователя после успешного удаления
      }
    } catch (err) {
      setError("User not found");
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value); // Обновляем состояние при изменении поля ввода
    setError(null);
  };

  return (
    <div>
      <h2>Delete User By ID</h2>
      <form className={styles.form}>
        <div className={styles.group}>
          <label>
            User ID to Delete:
            <input
              type="text"
              name="id"
              value={userId}
              onChange={handleInputChange}
              required
            />
          </label>
          
        </div>
        <button onClick={handleDeleteUser}>
            Delete User
          </button>
          {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteUser;
