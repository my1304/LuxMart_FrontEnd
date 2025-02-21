import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Импорт useLocation
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.png";
import AVATAR from "../../images/avatar.jpg";
import { logoutUser, toggleForm } from "../../features/user/userSlice";
import { fetchCartItemsByUser } from "../../features/cart/cartSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Получение текущего маршрута

  const [searchValue, setSearchValue] = useState("");

  const { currentUser } = useSelector(({ user }) => user);
  const { cartItems } = useSelector(({ cart }) => cart);

  const [values, setValues] = useState({
    username: "Guest . . . [ Sign Up ]",
    avatarPath: AVATAR,
  });

  const { data, isLoading } = useGetProductsQuery({
    params: { title: searchValue },
  });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCartItemsByUser(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    setIsDropdownOpen(false);
  };

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setValues({ username: "Guest", avatarPath: AVATAR });
  };

  const itemCount = cartItems.length;

  // Проверка на то, находимся ли мы на странице корзины или заказов
  const isRestrictedPage =
    location.pathname === ROUTES.CART || location.pathname === ROUTES.ORDERS;

  return (
    <div className={styles.Header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="LuxMart" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatarPath})` }}
          />
          <div className={styles.username}>{values.username}</div>
          <div
            className={`${styles.userdropdown} ${
              isDropdownOpen ? styles.show : ""
            }`}
          >
            {isDropdownOpen && (
              <div className={styles.dropdowncontent}>
                <p onClick={() => handleMenuClick(ROUTES.PROFILE)}>User Data</p>
                <div className="cont">
                  <p onClick={() => navigate(ROUTES.ORDERS)}>Orders</p>
                </div>
                {currentUser &&
                  currentUser.authorities &&
                  currentUser.authorities.some(
                    (role) => role.authority === "ROLE_ADMIN"
                  ) && (
                    <p onClick={() => handleMenuClick(ROUTES.ADMIN)}>
                      Admin Panel
                    </p>
                  )}
                <p onClick={() => handleMenuClick(ROUTES.SETTINGS)}>
                  Settings
                </p>
                <p onClick={handleLogout}>Sign Out</p>
              </div>
            )}
          </div>
        </div>

        {/* Скрываем поиск и иконку корзины на странице корзины и заказов */}
        {!isRestrictedPage && (
          <>
            <form className={styles.form}>
              <div className={styles.icon}>
                <svg className="icon">
                  <use
                    xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}
                  />
                </svg>
              </div>
              <div className={styles.input}>
                <input
                  type="search"
                  name="search"
                  placeholder="Search for any product"
                  autoComplete="off"
                  onChange={handleSearch}
                  value={searchValue}
                />
              </div>

              {searchValue && (
                <div className={styles.box}>
                  {isLoading
                    ? "Loading..."
                    : !data.length
                    ? "No results"
                    : data.map(({ title, imageUrls, id }) => {
                        return (
                          <Link
                            key={id}
                            onClick={() => setSearchValue("")}
                            className={styles.item}
                            to={`/products/${id}`}
                          >
                            <div
                              className={styles.image}
                              style={{
                                backgroundImage: `url(${imageUrls[0]})`,
                              }}
                            />

                            <div className={styles.title}>{title}</div>
                          </Link>
                        );
                      })}
                </div>
              )}
            </form>
            {currentUser && (
              <div className={styles.account}>
                <Link to={ROUTES.CART} className={styles.cart}>
                  Cart
                  <svg className={styles["icon-cart"]}>
                    <use
                      xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}
                    />
                  </svg>
                  {!!itemCount && (
                    <span className={styles.count}>{itemCount}</span>
                  )}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;