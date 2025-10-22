"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";

import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";

const buttons = ({ itemdata }) => {
  const router = useRouter();
  const [data, setData] = useState(itemdata);

  const update = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({
          stock: data.stock,
        })
        .eq("id", data.id);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const increment = () => {
    setData((prev) => ({ ...prev, stock: Number(data.stock) + 1 }));
  };

  const decrement = () => {
    if (data.stock > 0) {
      setData((prev) => ({ ...prev, stock: Number(data.stock) - 1 }));
    }
  };

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, stock: e.target.value }));
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const { error } = await supabase
          .from("inventory")
          .delete()
          .eq("id", data.id);
        
        if (error) throw error;
        
        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  useEffect(() => {
    update();
  }, [data]);

  return (
    <div className={styles["menu-item-counter"]}>
      <div className={styles["delete"]} onClick={handleDelete}>
        Delete
      </div>

      <div className={styles["menu-item-counter-button"]} onClick={decrement}>
        -
      </div>
      <input
        className={styles["menu-item-counter-value"]}
        style={{
          width: `${data?.stock.toString().length + 0.5}ch`,
        }}
        type="number"
        name="count"
        id="count"
        value={data?.stock}
        onChange={handleInput}
      />
      <div className={styles["menu-item-counter-button"]} onClick={increment}>
        +
      </div>
    </div>
  );
};

export default buttons;
