"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import { useSupabase } from "../supabase-provider";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
export const revalidate = 0;

const add = () => {
  const [newdata, setnewData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleAdd = async () => {
    const { error } = await supabase.from("inventory").insert(newdata);
    console.log(error);
    setIsOpen(false);
    router.refresh();
  };

  const handlegenerate = async () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button className={styles["delete"]} onClick={handlegenerate}>
        Add Item
      </button>
      <div className={isOpen ? styles.backdrop : styles.backdropoff} />
      <Dialog
        className={styles.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Item Details</Dialog.Title>
          <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setnewData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
            <label>Price:</label>
            <input
              type="number"
              placeholder="Price"
              onChange={(e) =>
                setnewData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
            <label>Stock:</label>
            <input
              type="number"
              placeholder="Stock"
              onChange={(e) =>
                setnewData((prev) => ({ ...prev, stock: e.target.value }))
              }
            />
            <label>GST:</label>
            <input
              type="number"
              placeholder="GST"
              onChange={(e) =>
                setnewData((prev) => ({ ...prev, stock: e.target.value }))
              }
            />
          </div>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleAdd}>Add Item</button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default add;
