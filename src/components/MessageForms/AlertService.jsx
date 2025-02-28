import styles from "../../styles/CustomBank.module.css";

const showAlert = (message) => {
  return new Promise((resolve) => {
    const alertContainer = document.createElement("div");
    alertContainer.id = "alert-container";
    document.body.appendChild(alertContainer);

    alertContainer.innerHTML = `
      <div class="${styles.overlay}">
        <div class="${styles.dialogBox}">
          <div class="${styles.titleBar}">
            <button class="${styles.closeBtn}" id="close-button">&times;</button>
          </div>
          <div class="${styles.contentArea}">
            <h2 class="${styles.alertText}">${message}</h2>
            <hr class="${styles.separator}" />
            <div class="${styles.buttonGroup}">
              <button class="${styles.okBtn}" id="ok-button">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const handleResponse = () => {
      alertContainer.remove();
      resolve();
    };

    document.getElementById("ok-button").addEventListener("click", handleResponse);
    document.getElementById("close-button").addEventListener("click", handleResponse);
  });
};

export default showAlert;