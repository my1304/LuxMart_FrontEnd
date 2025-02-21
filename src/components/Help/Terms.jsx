import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Help.module.css";

const Terms = () => {
  const { currentUser } = useSelector(({ user }) => user); // eslint-disable-line no-unused-vars
  const [feedback, setFeedback] = useState(""); // eslint-disable-line no-unused-vars

  const handleSubmitFeedback = (e) => { // eslint-disable-line no-unused-vars
    e.preventDefault();
    // Здесь можно добавить логику отправки обратной связи, например, на сервер
    //  alert("Feedback submitted: " + feedback);
    // setFeedback("");
  };

  return (
      <section className={styles.profile}>
        <div className={styles.formContainer}>
          <h2 style={{textDecoration: "underline"}}>Terms & Conditions</h2>
          <p>
            1. “Operational update” (OU) - updating the exchange database in two options, depending on the possibility and importance of maximum relevance
            of the data on the site, the following methods can be used:<br></br>

            - “Direct (parallel) recording” (DR) of changeable data of a metadata object at the time of their change/immediately after the change; <br></br>
            - “Private Periodic Update” (PPU) is a high-frequency update with a frequency of 1 minute of only the changes that occurred during that minute.<br></br>
            2. Full periodic update (PUP) - low-frequency update with a period of 1-3 times a day of all data in the exchange database in order to preserve
            their integrity and eliminate missed changes during operational updating.<br></br>
            3. The company’s “website”, its database, is the final update resource that goes beyond the scope of this technical specification and is presented here
            for general understanding. <br></br>
            4. CATEGORIES - categories by which materials are filtered.<br></br>
            5. Create an account – create a new user.<br></br>
            6. Login – log in to the system.<br></br>
            7. Logout – Logout from the system (Guest Access).
          </p>
        </div>
      </section>
  );
};

export default Terms;