"use client";

import { useRef, useState } from "react";
import styles from "../styles/page.module.css";
function details() {
  const Data = useRef({
    Date: "",
    InvoiceNo: "",
    Paymed: "",
    Name: "",
    Address: "",
    PhoneNo: "",
    DelName: "",
    DelAddress: "",
  });
  return (
    <form
      className={styles.forms}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(Data.current["Date"].value);
      }}
    >
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
          value={Data.Date}
          ref={(el) => (Data.current["Date"] = el)}
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Invoice No:</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Invoice No"
          value={Data.InvoiceNo}
          pattern="[0-9]+"
          onChange={(e) =>
            setData((prev) => ({ ...prev, InvoiceNo: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Payment method:</label>
        <select
          value={Data.Paymed}
          onChange={(e) =>
            setData((prev) => ({ ...prev, Paymed: e.target.value }))
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
          value={Data.Name}
          pattern="^[a-zA-Z]+$"
          onChange={(e) =>
            setData((prev) => ({ ...prev, Name: e.target.value }))
          }
          required
        />
      </div>

      <div className={styles["form-item"]}>
        <label>Buyer's Phone Number</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Buyer Phone Number"
          pattern="[0-9]+"
          value={Data.PhoneNo}
          onChange={(e) =>
            setData((prev) => ({ ...prev, PhoneNo: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Deliver Name</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Deliver Name"
          value={Data.DelName}
          pattern="^[a-zA-Z]+$"
          onChange={(e) =>
            setData((prev) => ({ ...prev, DelName: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Buyer's Address</label>
        <textarea
          type="address"
          placeholder="Buyer Address"
          value={Data.Address}
          onChange={(e) =>
            setData((prev) => ({ ...prev, Address: e.target.value }))
          }
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Delivery Address</label>
        <textarea
          type="address"
          placeholder="Delivery Address"
          value={Data.DelAddress}
          onChange={(e) =>
            setData((prev) => ({ ...prev, DelAddress: e.target.value }))
          }
          required
        />
      </div>
      <button type="submit"></button>
    </form>
  );
}

export default details;
