import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

import { NumberParam, StringParam, useQueryParam } from "use-query-params";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector((state) => state.categories);

  const [categoryId, setCategoryId] = useQueryParam("categoryId", NumberParam); // eslint-disable-line no-unused-vars
  const [title, setTitle] = useQueryParam("title", StringParam);
  const [price_min, setPrice_min] = useQueryParam("price_min", StringParam);
  const [price_max, setPrice_max] = useQueryParam("price_max", StringParam);

  // локальное состояние для инициализации значений
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localPriceMin, setLocalPriceMin] = useState(price_min || "");
  const [localPriceMax, setLocalPriceMax] = useState(price_max || "");

  const queryParams = {
    categoryId: Number(id),
    title: localTitle,
  };

  if (localPriceMin) {
    queryParams.price_min = Number(localPriceMin);
  }

  if (localPriceMax) {
    queryParams.price_max = Number(localPriceMax);
  }

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useGetProductsQuery({
    params: queryParams,
  });

  useEffect(() => {
    setCategoryId(Number(id));
    setTitle(localTitle);
    setPrice_min(localPriceMin);
    setPrice_max(localPriceMax);
  }, [
    id,
    setCategoryId,
    setTitle,
    setPrice_min,
    setPrice_max,
    localTitle,
    localPriceMin,
    localPriceMax,
  ]);

  const handleReset = () => {
    setLocalTitle("");
    setLocalPriceMin("");
    setLocalPriceMax("");
  };

  const handlePriceChange = (setter) => (e) => {
    const value = e.target.value;
    // Remove leading zeros if there are other digits after them
    const sanitizedValue = value.replace(/^0+(?=\d)/, "");
    setter(sanitizedValue);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        {list?.find((item) => item.id === Number(id))?.name || "Category"}
      </h2>

      <form className={styles.filters} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={(e) => setLocalTitle(e.target.value)}
            placeholder="Product name"
            value={localTitle}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="text"
            name="price_min"
            onChange={handlePriceChange(setLocalPriceMin)}
            placeholder="0"
            value={localPriceMin}
          />
          <span>price min</span>
        </div>
        <div className={styles.filter}>
          <input
            type="text"
            name="price_max"
            onChange={handlePriceChange(setLocalPriceMax)}
            placeholder="10000"
            value={localPriceMax}
          />
          <span>price max</span>
        </div>

        <button type="reset" onClick={handleReset} key="reset">
          Reset
        </button>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || data.length === 0 ? (
        <div className={styles.back}>
          <span>No Results</span>
        </div>
      ) : (
        <Products
          title=""
          products={data}
          style={{ padding: 0 }}
          amount={data.length}
        />
      )}
    </section>
  );
};

export default Category;
