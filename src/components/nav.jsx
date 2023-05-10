import styles from "../styles/page.module.css";

const nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles["nav-title"]}>
        {"<"}Bill Generator{"/>"}
      </div>
    </div>
  );
};

export default nav;
