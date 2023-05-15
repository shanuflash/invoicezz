"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import { useSupabase } from "../supabase-provider";
import { Dialog } from "@headlessui/react";

const buttons = ({ itemdata }) => {
  const [data, setData] = useState(itemdata);
  const [newdata, setnewData] = useState({ name: "", price: "", stock: ""});
  const [isOpen, setIsOpen] = useState(false);
  const { supabase } = useSupabase();

  const update = async () => {
    const { data: res, error } = await supabase
      .from("inventory")
      .update({
        stock: data.stock,
        price: data.price,
        name: data.name,
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

const handleAddItems = async () => {
  const { data, error } = await supabase.from("inventory").insert([
    {
      ...newdata,
    },
  ]);

  if (error) {
    console.log(error);
  } 
};

  const handleDelete = async () => {
    const { data: res, error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", data.id);
  };

  const handlegenerate = async () => {
    setIsOpen(true);
  };

  useEffect(() => {
    update();
  }, [data]);

  return (

      <div className={styles["menu-item-counter"]}>
      <div className={isOpen ? styles.backdrop : styles.backdropoff} />
      <div>

        <Dialog
          className={styles.modal}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Panel>
            <Dialog.Title>Item Details</Dialog.Title>
            <div className={styles["form-item"]}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, name: e.target.value }))
                }
                />
            </div>
            <div className={styles["form-item"]}>
              <label>Price:</label>
              <input
                type="number"
                placeholder="Price"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, price: e.target.value }))
                }
                />
            </div>
            <div className={styles["form-item"]}>
              <label>Stock:</label>
              <input
                type="number"
                placeholder="Stock"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, stock: e.target.value }))
                }
                />
            </div>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={handleAddItems}>Add Item</button>
          </Dialog.Panel>
        </Dialog>
        </div>
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
        <buttons className={styles["delete"]} onClick={handlegenerate}>
          Add Item
        </buttons>
      </div>

  );
};

export default buttons;
