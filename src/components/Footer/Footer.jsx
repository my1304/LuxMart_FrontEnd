import React from "react";

import styles from '../../styles/Footer.module.css';
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.png";

const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LuxMart" />
                </Link>
            </div>

            <div className={styles.rights}>
                Developed by Vyacheslav
            </div>

            <div className={styles.socials}>
                <a 
                    href="https://instagram.com" target="_blank" rel="noreferrer">
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
                        </svg>
                </a>

                <a 
                    href="https://facebook.com" target="_blank" rel="noreferrer">
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
                        </svg>
                </a>
            </div>
        </section>
    )
};

export default Footer;
