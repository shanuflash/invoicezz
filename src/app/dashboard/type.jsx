"use client";
import { useState } from "react";
import styles from "@/styles/page.module.css";
import { createClient } from "@/utils/supabase/client";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
export const revalidate = 0;

const type = () => {
  const [newdata, setnewData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("types").insert({
      name: newdata.name,
      cgst: parseFloat(newdata.cgst),
      sgst: parseFloat(newdata.sgst),
      gst: parseFloat(newdata.sgst) + parseFloat(newdata.cgst),
    });
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
        Add Type
      </button>
      <div className={isOpen ? styles.backdrop : styles.backdropoff} />

      <Dialog
        className={styles.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Type Details</Dialog.Title>
          <form className={`${styles["modal-form"]}`} onSubmit={handleAdd}>
            <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
              <label>Type Name:</label>
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
              <label>CGST:</label>
              <input
                required
                type="text"
                placeholder="Price"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, cgst: e.target.value }))
                }
              />
            </div>
            <div className={`${styles["form-item"]} ${styles["modal-item"]}`}>
              <label>SGST:</label>
              <input
                required
                type="text"
                placeholder="Price"
                onChange={(e) =>
                  setnewData((prev) => ({ ...prev, sgst: e.target.value }))
                }
              />
            </div>
            <div className={`${styles["nav-button-container"]}`}>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button type="submit">Add Type</button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default type;
