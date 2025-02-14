import React from 'react';

import styles from "../../styles/Home.module.css";

import BG from "../../images/computer.png";

import { Link } from 'react-router-dom';

const Poster = () => (
    <section className={styles.home}>
        <div className={styles.title}>SALE 40%</div>
        <div className={styles.product}>
            <div className={styles.text}>
                <div className={styles.subtitle}>L u x M a r t</div>
                <h1 className={styles.head}>Computers</h1>
                <Link to="/products/1"><button className={styles.button}>Shop now</button></Link>
            </div>
            <div className={styles.image}>
                <img src={BG} alt="" />
            </div>
        </div>
    </section>
)

export default Poster;
