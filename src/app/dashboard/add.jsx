"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import { supabase } from "@/app/supabase";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
export const revalidate = 0;

const add = () => {
  const [newdata, setnewData] = useState();
  const [type, setType] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    const { data } = await supabase
      .from("types")
      .select("gst")
      .eq("name", newdata.type);
    setnewData((prev) => ({ ...prev, gst: data[0].gst }));
    await supabase.from("inventory").insert(newdata);
    setIsOpen(false);
    router.refresh();
  };

  const handleType = async () => {
    const { data } = await supabase.from("types").select("name");
    setType(data);
    setnewData((prev) => ({ ...prev, type: data[0].name }));
  };

  useEffect(() => {
    handleType();
  }, []);

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
          <form className={`${styles["modal-form"]}`} onSubmit={handleAdd}>
            <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
              <label>Name:</label>
              <input
                required
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
                required
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
                required
                type="number"
                placeholder="Stock"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, stock: e.target.value }))
                }
              />
            </div>
            <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
              <label>ID:</label>
              <input
                type="text"
                placeholder="ID"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, id: e.target.value }))
                }
              />
            </div>
            <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
              <label>Type:</label>
              <select
                required
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                {type?.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className={`${styles["nav-button-container"]}`}>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button type="submit">Add Item</button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default add;
