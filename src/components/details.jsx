"use client";
import { React, useState } from "react";
function App() {
  const [Data, setData] = useState({
    Date: "",
    InvoiceNo: "",
    Paymed: "",
    Name: "",
    Address: "",
    PhoneNo: "",
    DelName: "",
    DelAddress: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="forms">
        <label>Date</label>
        <input
          type="date"
          placeholder="Date"
          value={Data.Date}
          onChange={(e) =>
            setData((prev) => ({ ...prev, Date: e.target.value }))
          }
          required
        />
        <label>Invoice No:</label>
        <input
          type="text"
          placeholder="Invoice No"
          value={Data.InvoiceNo}
          pattern="[0-9]+"
          onChange={(e) =>
            setData((prev) => ({ ...prev, InvoiceNo: e.target.value }))
          }
          required
        />
        <label>
          Payment method:
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
        </label>
        <label>Buyer's Name</label>
        <input
          type="text"
          placeholder="Buyer's Name"
          value={Data.Name}
          pattern="^[a-zA-Z]+$"
          onChange={(e) =>
            setData((prev) => ({ ...prev, Name: e.target.value }))
          }
          required
        />
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
        <label>Buyer's Phone Number</label>
        <input
          type="text"
          placeholder="Buyer Phone Number"
          pattern="[0-9]+"
          value={Data.PhoneNo}
          onChange={(e) =>
            setData((prev) => ({ ...prev, PhoneNo: e.target.value }))
          }
          required
        />
        <label>Deliver Name</label>
        <input
          type="text"
          placeholder="Deliver Name"
          value={Data.DelName}
          pattern="^[a-zA-Z]+$"
          onChange={(e) =>
            setData((prev) => ({ ...prev, DelName: e.target.value }))
          }
          required
        />
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
