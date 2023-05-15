import styles from "@/styles/page.module.css";
import MenuItem from "@/components/menuItem";
import Total from "@/components/total";
import Search from "@/components/search";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
const Home = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { count, error } = await supabase
    .from("inventory")
    .select("*", { count: "exact", head: true });
  
  

  return (
    <>
      <div className={styles.menu}>
        <Search/>
        <div className={styles["menu-title"]}>Add items to your bill:</div>
        <div className={styles["menu-container"]}>
          {Array.from({ length: count }, (_, index) => (
            <MenuItem id={index} key={index} />
          ))}
        </div>
      </div>
      <Total invoice={false} />
    </>
  );
};

export default Home;
