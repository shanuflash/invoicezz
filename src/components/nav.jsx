"use client";
import Link from "next/link";
import styles from "../styles/page.module.css";
import { useSupabase } from "@/app/supabase-provider";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { dataContext } from "@/context/dataProvider";

const nav = () => {
  const { handleItems } = useContext(dataContext);
  const pathname = usePathname();
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.nav}>
      <div className={styles["nav-title"]}>
        <Link href="/" onClick={handleItems} className={styles.logo}>
          {"<"}Bill Generator{"/>"}
        </Link>
        {pathname !== "/login" && (
          <div>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/history">History</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default nav;
