import styles from "@/styles/page.module.css";
import { createClient } from "@/utils/supabase/server";

import Add from "./add";
import Buttons from "./buttons";
import Price from "./price";
import Type from "./type";

export const revalidate = 0;

const dashboard = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });

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
        {data.map((item, id) => (
          <div className={styles["menu-item"]}>
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
              <Buttons itemdata={data[id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboard;
