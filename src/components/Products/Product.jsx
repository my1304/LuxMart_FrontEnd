import React, { useEffect, useState } from "react";
import styles from "@styles/Product.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, selectCartItems } from "../../features/cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";

const Product = (item) => {
  const { id, title, price, imageUrls, description } = item;
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = !!user;
  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    if (imageUrls.length > 0) {
      setCurrentImage(imageUrls[0]);
    }
  }, [imageUrls]);

  const isInCart = cartItems && cartItems.some((item) => item.productId === id);

  const addToCart = () => {    
    if (!isAuthenticated) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (isInCart) {
      alert("Product [ " + title + " ] is already in your cart!");
      return;
    }
   // alert("Product [ " + title + " ] will be added to cart!");
    dispatch(addItemToCart({ userId: user.id, productId: id, quantity: 1 }));
  //  window.location.reload();
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {imageUrls.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <p className={styles.description}>{description}</p>
        {!isAuthenticated ? (
          <p></p>
        ):(
          <div className={styles.actions}>
            <button onClick={addToCart} className={styles.add} >Add to cart</button>
          </div>
        )}
        <div className={styles.bottom}>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
