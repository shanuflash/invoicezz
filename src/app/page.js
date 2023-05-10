import Image from "next/image";
import styles from "../styles/page.module.css";
import Content from "@/components/content/content";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Content />
      </div>
    </main>
  );
}
