import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/Home.module.css";
import bannerImg from "../../images/banner.png";
import showAlert from "../../components/MessageForms/AlertService";

const Banner = ({categories}) => {
    const navigate = useNavigate();
    const handleSeeMoreClick = () => {
        if (categories && categories.length > 0) {
            const foundCategory = categories.find(category => category.name === "Sales");
            if (foundCategory) {
              showAlert(`Вы будете перенаправлены на категорию "Sale".`);
                navigate(`/categories/${foundCategory.id}`); // Перенаправление на категорию "Sale" по найденному ID
            } else {
              showAlert('Категория "Sales" не найдена.');
            }
        };
    };
    return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
          SUMMER
          <span>SALE</span>
        </p>
        <button className={styles.more} onClick={handleSeeMoreClick}>
          See more
        </button>
      </div>

      <div
        className={styles.right}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <p className={styles.discount}>
          save up to <span>20%</span> off
        </p>
      </div>
    </section>
  );
};
export default Banner;