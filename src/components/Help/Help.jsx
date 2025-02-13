import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import styles from "../../styles/Help.module.css";

const Help = () => {
  const { currentUser } = useSelector(({ user }) => user); // eslint-disable-line no-unused-vars
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки обратной связи, например, на сервер
    //  alert("Feedback submitted: " + feedback);
    // setFeedback("");
  };

  return (
      <section className={styles.profile}>
        {/* Полоса заголовка с крестиком */}
        <div className={styles.titleBar}>    
          <div className={styles.closeBtn}>
            <Link to={ROUTES.HOME}>
              &times;
            </Link>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2 style={{textDecoration: "underline"}}>Help Center</h2>
          <p>
            Welcome to our Help Center! Here you can find answers to frequently
            asked questions and get support
            for any issues you may encounter while using our service. <br></br>
          </p>
          <h2 style={{textDecoration: "underline"}}>Working with the site with “Guest” rights</h2>
          <p>
            1. Possibility to view the range of products;<br></br>
            2. Familiarize yourself with quantities and prices;<br></br>
            3. Look at the pictures visually.<br></br>
            <h2 style={{textDecoration: "underline"}}>Additionally work with the site with “User” rights</h2>
            4. Possibility of adding an assortment of products to the cart;<br></br>
            5. Opportunity to buy goods.
          </p>
          <br></br>
          <p>
            If you need further assistance, please contact our support team at{" "}
            <a href={`mailto:support@example.com`}>support@example.com</a>.
          </p>

          <form className={styles.form} onSubmit={handleSubmitFeedback}>
            <div className={styles.group}>
            <textarea
                placeholder="Enter your feedback or question here"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                required
            />
            </div>
            <button type="submit" className={styles.submit}>
              Submit Feedback
            </button>
          </form>
        </div>
      </section>
  );
};

export default Help;