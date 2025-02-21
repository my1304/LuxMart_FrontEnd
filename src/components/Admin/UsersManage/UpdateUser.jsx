import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../features/user/userSlice";
import styles from "../../../styles/Admin.module.css"; // Импорт стилей из Admin.module.css

const UpdateUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.currentUser);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
    setError(null); // Сброс ошибки при изменении ввода
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(updateUser({ userId, role }));
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Failed to update user role");
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update User Role</h2>
      <div className={styles.form}>
        <label className={styles.label}>
          User ID:
          <input
            className={styles.input}
            type="text"
            value={userId}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </label>
        <label className={styles.label}>
          Role:
          <input
            className={styles.input}
            type="text"
            value={role}
            onChange={handleRoleChange}
            required
            disabled={isLoading}
          />
        </label>
        <button
          className={styles.button}
          onClick={handleUpdateRole}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Role"}
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
          <p><span className={styles.fieldName}>Role:</span> {user.roles.map((role) => role.authority).join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
