"use client";

import { Dialog } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import { dataContext } from "@/context/dataProvider";
import { useRouter } from "next/navigation";

const total = ({ invoice }) => {
  const router = useRouter();

  const { count, price, setPrice, handleItems, tax, setTax } =
    useContext(dataContext);
  useEffect(() => {
    let total = 0;
    count.forEach((item) => {
      total += item.price * item.count;
    });
    setPrice(total);
    setTax(total * 2 * 0.14);
  }, [count]);

  const handleClear = () => {
    handleItems();
  };

  const handleNext = () => {
    localStorage.setItem("count", JSON.stringify(count));
    router.push("/details");
  };

  return (
    <>
      <div className={styles.total}>
        <div className={styles["total-left"]}>
          {!invoice && (
            <>
              <button onClick={handleClear}>Clear</button>
              <button onClick={handleNext}>Next</button>
            </>
          )}
        </div>
        <div className={styles["total-right"]}>
          <div className={styles["total-title"]}>
            Total:{" "}
            <span className={styles["total-price"]}>
              {invoice ? (
                <>₹{(price + tax).toLocaleString("en-IN")}</>
              ) : (
                <>₹{price.toLocaleString("en-IN")}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default total;
