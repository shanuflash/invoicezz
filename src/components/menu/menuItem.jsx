"use client";
import { dataContext } from "@/context/dataProvider";
import styles from "../../styles/page.module.css";
import { useContext, useEffect } from "react";

const menuItem = ({ id }) => {
  const { count, setCount } = useContext(dataContext);
  const increment = () => {
    if (count[id]?.stock > count[id]?.count) {
      setCount((prev) => {
        return prev.map((item) => {
          if (item.id === Number(id + 1)) {
            return { ...item, count: Number(item.count) + 1 };
          }
          return item;
        });
      });
    }
  };

  const decrement = () => {
    if (count[id]?.count > 0 && count[id]?.stock > 0)
      setCount((prev) => {
        return prev.map((item) => {
          if (item.id === Number(id + 1)) {
            return { ...item, count: Number(item.count) - 1 };
          }
          return item;
        });
      });
  };

  const handleInput = (e) => {
    if (count[id]?.stock >= e.target.value && e.target.value >= 0) {
      setCount((prev) => {
        return prev.map((item) => {
          if (item.id === Number(id + 1)) {
            return { ...item, count: e.target.value };
          }
          return item;
        });
      });
    }
  };

  return (
    <div className={styles["menu-item"]}>
      <div className={styles["menu-left"]}>
        <div className={styles["menu-item-title"]}>
          {count[id]?.name}{" "}
          <span style={{ fontSize: "0.8rem" }}>
            {count[id]?.stock && <>{count[id]?.stock} left</>}
          </span>
        </div>
        <div className={styles["menu-item-description"]}>
          This Cement is very good
        </div>
      </div>
      <div className={styles["menu-right"]}>
        <div className={styles["menu-item-price"]}>₹{count[id]?.price}</div>
        {count[id]?.stock > 0 ? (
          <div className={styles["menu-item-counter"]}>
            <div
              className={styles["menu-item-counter-button"]}
              onClick={decrement}
            >
              -
            </div>
            <input
              className={styles["menu-item-counter-value"]}
              style={{
                width: `${count[id]?.count.toString().length + 0.5}ch`,
              }}
              type="number"
              name="count"
              id="count"
              value={count[id]?.count}
              onChange={handleInput}
            />
            <div
              className={styles["menu-item-counter-button"]}
              onClick={increment}
            >
              +
            </div>
          </div>
        ) : (
          <>No stock</>
        )}
      </div>
    </div>
  );
};

export default menuItem;
