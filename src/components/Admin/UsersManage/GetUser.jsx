import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../features/user/userSlice";
import styles from "../../../styles/Admin.module.css"; // Импорт стилей из Admin.module.css

const GetUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
    setError(null); // Сброс ошибки при изменении ввода
  };

  const handleGetUser = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(fetchUserById(userId)).unwrap();
      if (!response) {
        setError("User not found");
      }
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get User By ID</h2>
      <div className={styles.form}>
        <label className={styles.label}>
          User ID:
          <input
            className={styles.input}
            type="text"
            value={userId}
            onChange={handleInputChange}
            required
          />
        </label>
        <button
          className={styles.button}
          onClick={handleGetUser}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get User"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {user && (
        <div className={styles.userData}>
          <p><span className={styles.fieldName}>ID:</span> {user.id}</p>
          <p><span className={styles.fieldName}>First Name:</span> {user.firstName}</p>
          <p><span className={styles.fieldName}>Last Name:</span> {user.lastName}</p>
          <p><span className={styles.fieldName}>Email:</span> {user.email}</p>
          <p><span className={styles.fieldName}>Username:</span> {user.username}</p>
          <p><span className={styles.fieldName}>Avatar Path:</span> {user.avatarPath}</p>
          {user.roles && (
        <p>
          <span className={styles.fieldName}>Role:</span>{" "}
          {user.roles.map((role) => role.authority).join(", ")}
        </p>
      )}
        </div>
      )}
    </div>
  );
};

export default GetUser;
