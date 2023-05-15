"use client";

import { useContext } from "react";
import styles from "@/styles/page.module.css";
import { dataContext } from "@/context/dataProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
function details() {
  const { formData, setformData } = useContext(dataContext);
  const router = useRouter();
  const handleClear = () => {
    setData({
      date: "",
      invoiceno: "",
      paymed: "",
      name: "",
      address: "",
      gstin: "",
      // phoneno: "",
      delname: "",
      deladdress: "",
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/preview");
  };

  return (
    <form className={styles.forms} onSubmit={handleNext}>
      <div
        className={styles["menu-title"]}
        style={{
          padding: "1rem 0 0 1rem",
        }}
      >
        Add invoice details:
      </div>
      <div className={styles["form-item"]}>
        <label>Date</label>
        <input
          autoComplete="off"
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, date: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Payment method:</label>
        <select
          value={formData.paymed}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, paymed: e.target.value }))
          }
        >
          <option value="">Select a payment method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>
      <div className={styles["form-item"]}>
        <label>Buyer's Name</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Buyer's Name"
          value={formData.name}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Delivery Name</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Deliver Name"
          value={formData.delname}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, delname: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Buyer's Address</label>
        <textarea
          type="address"
          placeholder="Buyer Address"
          value={formData.address}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, address: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Delivery Address</label>
        <textarea
          type="address"
          placeholder="Delivery Address"
          value={formData.deladdress}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, deladdress: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Buyer's GSTIN</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Buyer's GSTIN"
          // pattern="[0-9]+"
          value={formData.gstin}
          onChange={(e) =>
            setformData((prev) => ({ ...prev, gstin: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["button-container"]}>
        <div className={styles.button}>
          <Link style={{ width: "auto" }} href="/">
            Previous
          </Link>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button style={{ width: "auto" }} onClick={handleClear}>
            Clear
          </button>
          <button style={{ width: "auto" }} type="submit">
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default details;
