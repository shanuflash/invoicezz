import styles from "@/styles/page.module.css";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Buttons from "./buttons";
export const revalidate = 0;

const dashboard = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className={styles["menu"]}>
      <div className={styles["menu-title"]}>Change the stock of items:</div>
      <div className={styles["menu-container"]}>
        {data.map((item, id) => (
          <div className={styles["menu-item"]}>
            <div className={styles["menu-left"]}>
              <div className={styles["menu-item-title"]}>{item?.name}</div>
              <div className={styles["menu-item-description"]}>
                {/* This Cement is very good */}
              </div>
            </div>
            <div className={styles["menu-right"]}>
              <div className={styles["menu-item-price"]}>₹{item?.price}</div>
              <Buttons itemdata={data[id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboard;
