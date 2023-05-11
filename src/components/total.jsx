"use client";

import { useContext, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import { dataContext } from "@/context/dataProvider";

const total = ({ invoice }) => {
  const { count, setCount, price, setPrice, initialState } =
    useContext(dataContext);
  useEffect(() => {
    let total = 0;
    count.forEach((item) => {
      total += item.price * item.count;
    });
    setPrice(total);
  }, [count]);

  const handleClear = () => {
    setCount(initialState);
  };

  const handleGenerate = () => {
    window.print();
  };

  return (
    <div className={styles.total}>
      <div className={styles["total-left"]}>
        {!invoice && (
          <>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleGenerate}>Generate</button>
          </>
        )}
      </div>
      <div className={styles["total-right"]}>
        <div className={styles["total-title"]}>
          Total:{" "}
          <span className={styles["total-price"]}>
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default total;
