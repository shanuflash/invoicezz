"use client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import { dataContext } from "@/context/dataProvider";

const total = () => {
  const { count, setCount } = useContext(dataContext);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    count.forEach((item) => {
      total += item.price * item.count;
    });
    setPrice(total);
  }, [count]);

  const handleClear = () => {
    setCount([
      { id: 1, price: 100, count: 0 },
      { id: 2, price: 50, count: 0 },
      { id: 3, price: 200, count: 0 },
      { id: 4, price: 350, count: 0 },
    ]);
  };

  return (
    <div className={styles.total}>
      <div className={styles["total-left"]}>
        <button onClick={handleClear}>Clear</button>
        <button onClick={window.print}>Print</button>
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
