"use client";

import styles from "@/styles/page.module.css";
import { useContext, useRef } from "react";
import { dataContext } from "@/context/dataProvider";
import { useRouter } from "next/navigation";
function details() {
  const router = useRouter();
  const { Data } = useContext(dataContext);

  const handleClear = () => {
    Object.keys(Data.current).forEach((key) => {
      Data.current[key].value = "";
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log(Data.current);
    localStorage.setItem(
      "data",
      JSON.stringify({
        Date: Data.current["Date"].value,
        InvoiceNo: Data.current["InvoiceNo"].value,
        Paymed: Data.current["Paymed"].value,
        Name: Data.current["Name"].value,
        Address: Data.current["Address"].value,
        PhoneNo: Data.current["PhoneNo"].value,
        DelName: Data.current["DelName"].value,
        DelAddress: Data.current["DelAddress"].value,
      })
    );
    // router.push("/preview");
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
          ref={(el) => (Data.current["InvoiceNo"] = el)}
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Payment method:</label>
        <select value={Data.Paymed} ref={(el) => (Data.current["Paymed"] = el)}>
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
          ref={(el) => (Data.current["Name"] = el)}
          pattern="^[a-zA-Z]+$"
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
          ref={(el) => (Data.current["PhoneNo"] = el)}
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
          ref={(el) => (Data.current["DelName"] = el)}
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Buyer's Address</label>
        <textarea
          type="address"
          placeholder="Buyer Address"
          value={Data.Address}
          ref={(el) => (Data.current["Address"] = el)}
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Delivery Address</label>
        <textarea
          type="address"
          placeholder="Delivery Address"
          value={Data.DelAddress}
          ref={(el) => (Data.current["DelAddress"] = el)}
          required
        />
      </div>
      <div className={styles["button-container"]}>
        <div>
          <button style={{ width: "auto" }} onClick={() => router.back()}>
            Previous
          </button>
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
