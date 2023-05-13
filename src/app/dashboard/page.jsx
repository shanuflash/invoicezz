"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";
import styles from "@/styles/page.module.css";

export const revalidate = 0;

const dashboard = () => {
  const { supabase } = useSupabase();
  const [data, setData] = useState([]);

  const handleData = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.log(error);
    else {
      setData(data);
    }
  };

  const handleUpdate = async () => {
    data.forEach(async (item) => {
      const { data, error } = await supabase
        .from("inventory")
        .update({ stock: item.stock })
        .eq("id", item.id);
    });
    handleData();
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", id);
    if (error) console.log(error);
    else handleData();
  };

  const increment = (id) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === Number(id + 1)) {
          return { ...item, stock: Number(item.stock) + 1 };
        }
        return item;
      });
    });
  };

  const decrement = (id) => {
    if (data[id]?.stock > 0)
      setData((prev) => {
        return prev.map((item) => {
          if (item.id === Number(id + 1)) {
            return { ...item, stock: Number(item.stock) - 1 };
          }
          return item;
        });
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className={styles["menu"]}>
      <div className={styles["menu-title"]}>Change the stock of items:</div>
      <div className={styles["menu-container"]}>
        {data.map((item, id) => (
          <div className={styles["menu-item"]}>
            <div className={styles["menu-left"]}>
              <div className={styles["menu-item-title"]}>{item?.name}</div>
              <div className={styles["menu-item-description"]}>
                {/* This Cement is very good */}
              </div>
            </div>
            <div className={styles["menu-right"]}>
              <div className={styles["menu-item-price"]}>₹{item?.price}</div>
              <div className={styles["menu-item-counter"]}>
                <div
                  className={styles["menu-item-counter-button"]}
                  onClick={() => decrement(id)}
                >
                  -
                </div>
                <input
                  className={styles["menu-item-counter-value"]}
                  style={{
                    width: `${item?.stock.toString().length + 0.5}ch`,
                  }}
                  type="number"
                  name="count"
                  id="count"
                  value={item?.stock}
                  // onChange={handleInput}
                />
                <div
                  className={styles["menu-item-counter-button"]}
                  onClick={() => increment(id)}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleUpdate}>save</button>
      </div>
    </div>
  );
};

export default dashboard;
