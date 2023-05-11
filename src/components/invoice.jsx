"use client";

import { dataContext } from "@/context/dataProvider";
import { useContext } from "react";
import styles from "../styles/page.module.css";

const invoice = () => {
  const { count, price } = useContext(dataContext);
  return (
    <div className={styles["invoice-item-container"]}>
      <div className={styles["invoice-title"]}>
        <div className={styles["invoice-title-text"]}>Item</div>
        <div className={styles["invoice-title-text"]}>HSN/SAC</div>
        <div className={styles["invoice-title-text"]}>Quantity</div>
        <div className={styles["invoice-title-text"]}>Price</div>
        <div className={styles["invoice-title-text"]}>Amount</div>
      </div>
      {count.map((item) => {
        if (item.count > 0) {
          return (
            <div className={styles["invoice-item"]}>
              <div className={styles["invoice-value"]}>{item.name}</div>
              <div className={styles["invoice-value"]}>123</div>
              <div className={styles["invoice-value"]}>{item.count}</div>
              <div className={styles["invoice-value"]}>{item.price}</div>
              <div className={styles["invoice-value"]}>
                {item.price * item.count}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default invoice;
