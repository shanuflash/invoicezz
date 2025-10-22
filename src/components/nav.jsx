"use client";
import Link from "next/link";
import styles from "../styles/page.module.css";
import { usePathname } from "next/navigation";

const nav = () => {
  const pathname = usePathname();
  
  return (
    <div className={styles.nav}>
      <div className={styles["nav-title"]}>
        <Link href="/" className={styles.logo}>
          {"<"}Invoice Generator{"/>"}
        </Link>
        {pathname !== "/login" && (
          <div>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/history">History</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default nav;
