"use client";

import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { empty, change } from "@/redux/formSlice";

function details() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    
    router.push("/preview");
  };

  return (
    <>
      <div
        className={styles["menu-title"]}
        style={{
          paddingLeft: "1rem",
        }}
      >
        Add invoice details:
      </div>
      <form className={styles.forms} onSubmit={handleNext}>
        <div className={styles["form-item"]}>
          <label>Date</label>
          <input
            autoComplete="off"
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) =>
              dispatch(change({ name: "date", value: e.target.value }))
            }
            required
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Payment method:</label>
          <select
            value={formData.paymed}
            onChange={(e) =>
              dispatch(change({ name: "paymed", value: e.target.value }))
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
          <label>Buyer's GSTIN</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Buyer's GSTIN"
            value={formData.gstin}
            onChange={(e) =>
              dispatch(change({ name: "gstin", value: e.target.value }))
            }
            required
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Payment References</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Card/UPI/Chq No."
            value={formData.payref}
            onChange={(e) =>
              dispatch(change({ name: "payref", value: e.target.value }))
            }
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Buyer's Name</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Buyer's Name"
            value={formData.name}
            onChange={(e) =>
              dispatch(change({ name: "name", value: e.target.value }))
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
              dispatch(change({ name: "delname", value: e.target.value }))
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
              dispatch(change({ name: "address", value: e.target.value }))
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
              dispatch(change({ name: "deladdress", value: e.target.value }))
            }
            required
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Dispatched Through</label>
          <input
            type="text"
            placeholder="Dispatched Through"
            value={formData.disthro}
            onChange={(e) =>
              dispatch(change({ name: "disthro", value: e.target.value }))
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
            <button
              type="button"
              style={{ width: "auto" }}
              onClick={() => dispatch(empty())}
            >
              Clear
            </button>
            <button style={{ width: "auto" }} type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default details;
