"use client";
import Link from "next/link";
import styles from "../styles/page.module.css";
import { useSupabase } from "@/app/supabase-provider";
import { usePathname, useRouter } from "next/navigation";

const nav = () => {
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
        <Link href="/" className={styles.logo}>
          {"<"}SARAVANAN TRADERS{"/>"}
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
