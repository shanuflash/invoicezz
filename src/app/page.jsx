import Image from "next/image";
import styles from "../styles/page.module.css";
import Menu from "@/components/menu/menu";
import Total from "@/components/total";

export default function Home() {
  return (
    // <main className={styles.main}>
    <div className={styles.content}>
      <Menu />
      <Total />
    </div>
    // </main>
  );
}
