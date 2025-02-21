import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import styles from "../../styles/CustomAlert.module.css";

// Основной компонент, который рендерит модальное окно и управляет его состоянием
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  document.body.appendChild(alertContainer);

  // Функция для закрытия модального окна и удаления контейнера из DOM
  const handleAlertClose = () => {
    root.unmount(); // Удаление компонента из DOM
    document.body.removeChild(alertContainer); // Удаление контейнера из DOM
  };

  // Компонент для отображения модального окна
  const CustomAlert = ({ message, onClose }) => {
    return (
      <div className={styles.overlay}>
        <div className={styles.worktBox}>
          <div className={styles.titleBar}>
            <button className={styles.closeBtn} onClick={onClose}>
              &times;
            </button>
          </div>

          <div className={styles.alertBox}>
            <p className={styles.alertText}>{message}</p>
            <br />
            <br />
            <button className={styles.btn} onClick={onClose}>Ok</button>
          </div>  
        </div>
      </div>
    );
  };

  CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Создаем корневой элемент для React
  const root = ReactDOM.createRoot(alertContainer);

  // Рендерим модальное окно в alertContainer
  root.render(
    <CustomAlert message={message} onClose={handleAlertClose} />
  );

  return null;
};

// Экспортируем основную функцию для показа алерта
export default showAlert;