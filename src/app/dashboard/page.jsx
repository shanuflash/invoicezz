import styles from "@/styles/page.module.css";

import { supabase } from "@/app/supabase";

import Add from "./add";
import Buttons from "./buttons";
import Price from "./price";
import Type from "./type";

// optimize with redux
// import { store } from "@/redux/store";
export const revalidate = 0;

const dashboard = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching inventory:", error);
  }

  const items = data || [];

  return (
    <div className={styles["menu"]}>
      <div className={styles["menu-title"]}>
        Change the stock of items:
        <div className={styles["menu-button"]}>
          <Type />
          <Add />
        </div>
      </div>
      <div className={styles["menu-container"]}>
        {items.length === 0 ? (
          <div style={{ padding: "1rem", textAlign: "center" }}>
            No items in inventory. Add items using the "Add Item" button above.
          </div>
        ) : null}
        {items.map((item, id) => (
          <div className={styles["menu-item"]} key={item.id}>
            <div className={styles["menu-left"]}>
              <div className={styles["menu-item-title-id"]}>
                ID {item?.id} {" - "}
                {item?.type?.toUpperCase()}
              </div>
              <div className={styles["menu-item-title"]}>
                {item?.name}
                <span style={{ fontSize: "0.8rem" }}>
                  {item?.stock ? (
                    <>
                      {" - "}
                      {item?.stock} left
                    </>
                  ) : null}
                </span>
              </div>
            </div>
            <div className={styles["menu-right"]}>
              <Price price={item?.price} id={item?.id} />
              <Buttons itemdata={items[id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboard;
