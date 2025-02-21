import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import {
  selectCartItems,
  fetchupdateCartItem,
  fetchdeleteItemFromCart,
  fetchCartItemsByUser,
  fetchOrderItemByUser,
  fetchPaymentItem,
} from "../../features/cart/cartSlice"; // Экшн для получения данных корзины
import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import showAlert from "../../components/MessageForms/AlertService";
import bankPay from "../../components/MessageForms/BankPay";

const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user); // Получаем текущего пользователя
  const cartItems = useSelector(selectCartItems); // Получаем данные корзины
  const [localCartItems, setLocalCartItems] = useState([]);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // Загружаем данные корзины для текущего пользователя
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCartItemsByUser(currentUser.id));
    }
  }, [currentUser, dispatch]);

  // Обновляем локальное состояние, когда cartItems изменяется
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  // Функция изменения количества товаров в корзине
  const changeQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      showAlert(
        "Quantity cannot be less than 1, you can only delete the product"
      );
    } else {
      // Обновляем локальное количество для мгновенного отображения
      const updatedItems = localCartItems.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCartItems(updatedItems);

      // Обновляем количество на сервере
      dispatch(
        fetchupdateCartItem({
          cartId,
          updateCartItem: { quantity: newQuantity },
        })
      );
    }
  };

  // Функция удаления товара из корзины
  const removeItem = (cartId) => {
    dispatch(fetchdeleteItemFromCart(cartId));
  };

  // Функция оплаты товара
  const paymentItem = (cartId) => {
    // Обновляем состояние оплаты локально
    const updatedItems = localCartItems.map((item) =>
      item.id === cartId ? { ...item, orderPay: !item.orderPay } : item
    );
    setLocalCartItems(updatedItems);

    // Выполняем оплату на сервере
    dispatch(fetchPaymentItem(cartId));
  };

  const handleCheckout = () => {
    showAlert("You are redirected to the payment site");
    bankPay("Example Parameter", handleBankData);
  };
  const handleBankData = (data) => {
    const absender = data[0];
    const post = data[1];
    const nameBank = data[2];
    const carte = data[3];
    dispatch(
      fetchOrderItemByUser({
        userId: currentUser.id,
        addData: { absender, post, nameBank, carte },
      })
    );
    window.location.reload();
    setIsPaymentSuccess(true);
  };

  // Проверяем, аутентифицирован ли пользователь
  const isAuthenticated = !!currentUser;

  return (
    <section className={styles.cart}>
      <div className={styles.titleBar}>
        <div className={styles.closeBtn}>
          <Link to={ROUTES.HOME}>&times;</Link>
        </div>
      </div>

      <h2 className={styles.title}>Your cart</h2>

      {!isAuthenticated ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {localCartItems.length === 0 ? (
              <div className={styles.empty}>Here is empty</div>
            ) : (
              localCartItems.map((cartItem) => (
                <div className={styles.item} key={cartItem.id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${cartItem.imageUrls[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{cartItem.title}</h3>
                    <div className={styles.category}>
                      {cartItem.categoryName}
                    </div>
                  </div>

                  <div className={styles.price}>{cartItem.price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(
                          cartItem.id,
                          Math.max(0, cartItem.quantity - 1)
                        )
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{cartItem.quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(cartItem.id, cartItem.quantity + 1)
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>
                    {(cartItem.price * cartItem.quantity).toFixed(2)}$
                    <div
                      className={styles.payCart}
                      onClick={() => paymentItem(cartItem.id)}
                    >
                      {cartItem.orderPay
                        ? "[  +  Is  Paid  ]"
                        : "[ - Not Paid ]"}
                    </div>
                  </div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(cartItem.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
          {localCartItems.length > 0 && (
            <div className={styles.actions}>
              <div className={styles.total}>
                TOTAL PRICE:{" "}
                <span>
                  {sumBy(
                    localCartItems,
                    (item) => item.quantity * item.price
                  ).toFixed(2)}
                  $
                </span>
              </div>
              {!isPaymentSuccess ? (
                <button className={styles.proceed} onClick={handleCheckout}>
                  Proceed to checkout
                </button>
              ) : (
                <div className={styles.successMessage}>
                  Payment successful! Your order has been placed.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
