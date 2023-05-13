import styles from "@/styles/page.module.css";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
export const revalidate = 0;

const history = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("invoiceno", { ascending: false });

  return (
    <div className={styles["history"]}>
      <div className={styles["menu-title"]} style={{ padding: "0" }}>
        History
      </div>
      {data.map((item) => (
        <div className={styles["history-item"]}>
          <div className={styles["item-invoiceno"]}>ID: {item.invoiceno}</div>
          <div className={styles["item-data"]}>Date: {item.date}</div>
          <div className={styles["item-data"]}>Name: {item.name}</div>
          <div className={styles["item-data"]}>GSTIN: {item.gstin}</div>
          <div className={styles["item-data"]}>Address: {item.address}</div>
          <div className={styles["item-data"]}>
            Delivery Address: {item.delname}, {item.deladdress}
          </div>
          <div className={styles["item-data"]}>
            Payment Method: {item.paymed}
          </div>
          <div className={styles["item-data"]}>
            Items:
            {item.items?.map((data) => {
              if (data.count > 0)
                return (
                  <div>
                    {data.name} - {data.count}
                  </div>
                );
            })}
          </div>
          <div className={styles["item-data"]}>Total: ₹{item.total}</div>
        </div>
      ))}
    </div>
  );
};

export default history;
