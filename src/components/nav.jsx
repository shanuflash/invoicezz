import Link from "next/link";
import styles from "../styles/page.module.css";

const nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles["nav-title"]}>
        {"<"}Bill Generator{"/>"}
        <Link href="/history">History</Link>
      </div>
    </div>
  );
};

export default nav;
