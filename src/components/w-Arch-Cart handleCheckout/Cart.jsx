import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem,
  deleteItemFromCart,
  selectCartItems,
  fetchCartItemsByUser,
} from "../../features/cart/cartSlice"; // Экшн для получения данных корзины

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import {
  useGetProductsIdByCartQuery,
} from "../../features/api/apiSlice";

import { getProductById } from "../../features/products/productsSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user); // Получаем текущего пользователя
  const cartItems = useSelector(selectCartItems); // Получаем данные корзины
  const [products, setProducts] = useState([]); // Состояние для хранения продуктов
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // Загружаем данные корзины для текущего пользователя
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCartItemsByUser(currentUser.id));
    }
  }, [currentUser, dispatch]);

  // Используем кастомный хук для получения данных продуктов по cartId
  const { data: cartData, error: cartIdsError } = useGetProductsIdByCartQuery(currentUser?.id);

  // Сопоставляем данные продуктов с корзиной
  useEffect(() => {
    if (cartData) {
      const productIds = cartData.map((item) => item.productId);
      const fetchProducts = async () => {
        try {
          const productPromises = productIds.map((productId) =>
            dispatch(getProductById(productId))
          );
          const productsData = await Promise.all(productPromises);
          setProducts(productsData.map((item) => item.payload)); // Получаем продукты и сохраняем их
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [cartData, dispatch]);

  // Функция изменения количества товаров в корзине
  const changeQuantity = (cartItemId, quantity) => {
    dispatch(updateCartItem({ cartItemId, updateCartItem: { quantity } }));
  };

  // Функция удаления товара из корзины
  const removeItem = (cartItemId) => {
    dispatch(deleteItemFromCart(cartItemId));
  };

  const handleCheckout = () => {
    setIsPaymentSuccess(true);
  };

  // Проверяем, аутентифицирован ли пользователь
  const isAuthenticated = !!currentUser;

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {!isAuthenticated ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
        <div className={styles.list}>
        {products.length === 0 ? (
            <div className={styles.empty}>Here is empty</div>
          ) : (
            products.map((product) => {
              const cartItem = cartItems.find((item) => item.productId === product.id);
              if (!cartItem) {
                return (
                  <div className={styles.empty} key={product.id}>
                    Here is empty
                  </div>
                );
              }
              return (
                <div className={styles.item} key={product.id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{product.title}</h3>
                    <div className={styles.category}>{product.categoryName}</div>
                  </div>

                  <div className={styles.price}>{product.price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
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
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>
                    {(product.price * cartItem.quantity).toFixed(2)}$
                  </div>

                  <div className={styles.close} onClick={() => removeItem(cartItem.id)}>
                    <svg className="icon">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                    </svg>
                  </div>
                </div>
              );

            })
          )}
        </div>
          
          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {sumBy(cartItems, (item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return product ? item.quantity * product.price : 0;
                }).toFixed(2)}$  
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
        </>
      )}
    </section>
  );
};

export default Cart;