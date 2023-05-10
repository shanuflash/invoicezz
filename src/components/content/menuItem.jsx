import styles from "../../styles/page.module.css";

const menuItem = ({ id }) => {
  return (
    <div className={styles["menu-item"]}>
      <div className={styles["menu-left"]}>
        <div className={styles["menu-item-title"]}>Cement {id}</div>
        <div className={styles["menu-item-description"]}>
          This Cement is very good
        </div>
      </div>
      <div className={styles["menu-right"]}>
        <div className={styles["menu-item-price"]}>$100</div>
        <div className={styles["menu-item-counter"]}>
          <div className={styles["menu-item-counter-button"]}>-</div>
          <div className={styles["menu-item-counter-value"]}>0</div>
          <div className={styles["menu-item-counter-button"]}>+</div>
        </div>
      </div>
    </div>
  );
};

export default menuItem;
