"use client";
import { dataContext } from "@/context/dataProvider";
import styles from "../styles/page.module.css";
import React, { useContext } from "react";
import Total from "./total";
import numWords from "num-words";

const preview = () => {
  const { count, price } = useContext(dataContext);
  return (
    <div className={styles.menu}>
      <div className={styles["menu-title"]}>Preview</div>
      <div className={styles.print}>
        <div className={styles.left}>
          <div className={styles["invoice-company-name"]}>Company Name</div>
          <div className={styles["invoice-company-address"]}>
            Company Address, City, State, Country
          </div>
          <div className={styles["invoice-company-contact"]}>
            Phone: 1234567890, Email:
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles["invoice-date"]}>
            Date: {new Date().toLocaleDateString()}
          </div>
          <div className={styles["invoice-number"]}>Invoice No: 1234567890</div>
          <div className={styles["invoice-method"]}>
            Payment Method: Cash on Delivery
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.left}>
          <div className={styles["invoice-buyer"]}>
            <div className={styles["invoice-buyer-title"]}>Buyer</div>
            <div className={styles["invoice-buyer-name"]}>Name</div>
            <div className={styles["invoice-buyer-address"]}>Address</div>
            <div className={styles["invoice-buyer-contact"]}>
              Phone: 1234567890, Email:
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles["invoice-delivery"]}>
            <div className={styles["invoice-delivery-title"]}>Delivery</div>
            <div className={styles["invoice-delivery-name"]}>Name</div>
            <div className={styles["invoice-delivery-address"]}>Address</div>
          </div>
        </div>
        <div className={styles.divider} />
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
        [GST WIP]
        <Total invoice />
        <div className="invoice-ammountinworkds">
          <div className="invoice-ammountinworkds-title">Amount in Words</div>
          <div className="invoice-ammountinworkds-value">{numWords(price)}</div>
        </div>
      </div>
    </div>
  );
};

export default preview;
