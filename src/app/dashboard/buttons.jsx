"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import { useSupabase } from "../supabase-provider";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Add from "./add";

const buttons = ({ itemdata }) => {
  const router = useRouter();
  const [data, setData] = useState(itemdata);
  const { supabase } = useSupabase();

  const update = async () => {
    await supabase
      .from("inventory")
      .update({
        stock: data.stock,
        // price: data.price,
        // name: data.name,
      })
      .eq("id", data.id);
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
    await supabase.from("inventory").delete().eq("id", data.id);
    router.refresh();
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
