"use client";

import styles from "../styles/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/dataSlice";
import Link from "next/link";

const total = ({ invoice }) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.data.price);
  const tax = useSelector((state) => state.data.tax);

  return (
    <>
      <div className={styles.total}>
        <div className={styles["total-left"]}>
          {!invoice && (
            <>
              <button onClick={() => dispatch(clear())}>Clear</button>
              <Link href="/details">Next</Link>
            </>
          )}
        </div>
        <div className={styles["total-right"]}>
          <div className={styles["total-title"]}>
            Total:{" "}
            <span className={styles["total-price"]}>
              {Object.keys(tax).map((key) => tax[key].total)}
              {invoice ? (
                <>
                  ₹
                  {(
                    price.total +
                    Object.values(price.total).reduce(
                      (sum, value) => sum + value,
                      0
                    )
                  ).toLocaleString("en-IN")}
                </>
              ) : (
                <>₹{price.total.toLocaleString("en-IN")}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default total;
