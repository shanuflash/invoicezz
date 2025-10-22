"use client";
import styles from "@/styles/page.module.css";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const price = ({ price, id }) => {
  const supabase = createClient();
  const [data, setData] = useState(price);

  const handleInput = (e) => {
    setData(e.target.value);
  };

  const update = async () => {
    await supabase.from("inventory").update({ price: data }).eq("id", id);
  };

  useEffect(() => {
    update();
  }, [data]);

  return (
    <div className={styles["menu-item-price"]}>
      ₹
      <input
        className={styles["menu-item-counter-value"]}
        style={{
          width: `${data.toString().length + 0.5}ch`,
        }}
        type="number"
        name="count"
        id="count"
        value={data}
        onChange={handleInput}
      />
    </div>
  );
};

export default price;
