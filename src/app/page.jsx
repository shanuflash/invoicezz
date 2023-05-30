"use client";
import styles from "@/styles/page.module.css";

import Total from "@/components/total";
import { useSupabase } from "./supabase-provider";
import { useContext, useEffect } from "react";
import { dataContext } from "@/context/dataProvider";
const Home = () => {
  const { supabase } = useSupabase();
  const { data, setData } = useContext(dataContext);

  const increment = (id) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === Number(id) && item.stock > item.count) {
          return { ...item, count: Number(item.count) + 1 };
        }
        return item;
      });
    });
  };

  const decrement = (id) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === Number(id) && item.count > 0 && item.stock > 0) {
          return { ...item, count: Number(item.count) - 1 };
        }
        return item;
      });
    });
  };

  const handleInput = (e, id) => {
    setData((prev) => {
      return prev.map((item) => {
        if (
          item.id === Number(id) &&
          item.stock >= e.target.value &&
          e.target.value >= 0
        ) {
          return { ...item, count: e.target.value };
        }
        return item;
      });
    });
  };

  return (
    <>
      <div className={styles.menu}>
        <div className={styles["menu-title"]}>Add items to your bill:</div>
        <div className={styles["menu-container"]}>
          {data.map((item, i) => (
            <div className={styles["menu-item"]} key={i}>
              <div className={styles["menu-left"]}>
                <div className={styles["menu-item-title-id"]}>
                  ID {item?.id} {" - "}
                  {item.type.toUpperCase()}
                </div>
                <div className={styles["menu-item-title"]}>
                  {item?.name}
                  <span style={{ fontSize: "0.8rem" }}>
                    {item?.stock ? (
                      <>
                        {" - "}
                        {item?.stock} left
                      </>
                    ) : null}
                  </span>
                </div>
              </div>
              <div className={styles["menu-right"]}>
                <div className={styles["menu-item-price"]}>₹{item?.price}</div>
                <div className={styles["menu-item-counter"]}>
                  <div
                    className={styles["menu-item-counter-button"]}
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </div>
                  {item?.stock > 0 ? (
                    <input
                      className={styles["menu-item-counter-value"]}
                      style={{
                        width: `${item?.count.toString().length + 0.5}ch`,
                      }}
                      type="number"
                      name="count"
                      id="count"
                      value={item?.count}
                      onChange={(e) => handleInput(e, item.id)}
                    />
                  ) : (
                    <>No stock</>
                  )}
                  <div
                    className={styles["menu-item-counter-button"]}
                    onClick={() => increment(item.id)}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Total invoice={false} />
    </>
  );
};

export default Home;
