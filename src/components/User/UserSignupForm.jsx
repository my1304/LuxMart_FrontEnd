import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, loginUser, fetchUserProfile } from "../../features/user/userSlice"; // eslint-disable-line no-unused-vars

import styles from "../../styles/User.module.css";

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    try {
      // Создаем пользователя
      await dispatch(createUser(values));

      // Логинимся для получения access token
      const loginValues = {
        email: values.email,
        password: values.password,
      };
      await dispatch(loginUser(loginValues));

      // Получаем профиль пользователя после успешного логина
      
      // Закрываем форму после успешной регистрации, логина и получения профиля
      closeForm();
    } catch (error) {
      console.error("Failed to create user or fetch profile:", error);
      // Обработка ошибок при регистрации, логине или получении профиля
      // Здесь можно добавить логику для отображения ошибок на UI
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="firstName"
            placeholder="Your firstName"
            name="firstName"
            value={values.firstName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="lastName"
            placeholder="Your lastName"
            name="lastName"
            value={values.lastName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="username"
            placeholder="Your username"
            name="username"
            value={values.username}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}
        >
          I already have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
