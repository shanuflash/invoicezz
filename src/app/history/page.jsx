"use client";
import styles from "@/styles/page.module.css";

import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";

const history = () => {
  const [Data, setData] = useState([]);
  const [date, setDate] = useState({
    from: "",
    to: "",
  });

  const getHistory = async () => {
    try {
      let query = supabase
        .from("history")
        .select("*")
        .order("invoiceno", { ascending: false });

      if (date.from && date.to) {
        query = query.gte("date", date.from).lt("date", date.to);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      setData(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setData([]);
    }
  };

  useEffect(() => {
    getHistory();
  }, [date]);

  return (
    <div className={styles["history"]}>
      <div className={styles["menu-title"]} style={{ padding: "0" }}>
        History
      </div>
      <div className={styles["date-container"]}>
        <input
          type="date"
          name="from"
          onChange={(e) => {
            setDate({ ...date, from: e.target.value });
          }}
        />
        <input
          type="date"
          name="to"
          onChange={(e) => {
            setDate({ ...date, to: e.target.value });
          }}
        />
      </div>
      {Data.length === 0 ? (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          No invoice history found.
        </div>
      ) : null}
      {Data.map((item, index) => (
        <div className={styles["history-item"]} key={item.invoiceno || index}>
          <div className={styles["item-invoiceno"]}>ID: {item.invoiceno}</div>
          <div className={styles["item-data"]}>Date: {item.date}</div>
          <div className={styles["item-data"]}>
            Payment Method: {item.paymed}
          </div>
          <div className={styles["item-data"]}>GSTIN: {item.gstin}</div>
          <div className={styles["item-data"]}>Payment Ref: {item.payref}</div>
          <div className={styles["item-data"]}>Name: {item.name}</div>
          <div className={styles["item-data"]}>
            Delivery Name: {item.delname}
          </div>
          <div className={styles["item-data"]}>Address: {item.address}</div>
          <div className={styles["item-data"]}>
            Delivery Address: {item.deladdress}
          </div>
          <div className={styles["item-data"]}>Total: ₹{item.total}</div>
          <div className={styles["item-data"]}>
            Dispatched Through: {item.disthro}
          </div>
          <div className={styles["item-data"]}>
            Items:
            {item.items?.map((data, idx) => {
              if (data.count > 0)
                return (
                  <div key={idx}>
                    {data.name} - {data.count}
                  </div>
                );
            })}
          </div>
        </div>
      ))}
      <div className={styles["history-total"]}>
        Total: ₹
        {Data.reduce((acc, item) => {
          return acc + item.total;
        }, 0)}
      </div>
    </div>
  );
};

export default history;
