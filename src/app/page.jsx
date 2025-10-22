"use client";
import styles from "@/styles/page.module.css";

import Total from "@/components/total";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, input } from "@/redux/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading inventory...
      </div>
    );
  }

  return (
    <>
      <div className={styles.menu}>
        <div className={styles["menu-title"]}>Add items to your bill:</div>
        <div className={styles["menu-container"]}>
          {data.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              No items available. Please add items in the Dashboard.
            </div>
          ) : null}
          {data.map((item, i) => (
            <div className={styles["menu-item"]} key={item.id || i}>
              <div className={styles["menu-left"]}>
                <div className={styles["menu-item-title-id"]}>
                  ID {item?.id} {" - "}
                  {item?.type?.toUpperCase()}
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
                    onClick={() => dispatch(decrement(item.id))}
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
                      onChange={(e) =>
                        dispatch(input({ value: e.target.value, id: item.id }))
                      }
                    />
                  ) : (
                    <>No stock</>
                  )}
                  <div
                    className={styles["menu-item-counter-button"]}
                    onClick={() => dispatch(increment(item.id))}
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
