import styles from "../../styles/page.module.css";
import MenuItem from "./menuItem";

const menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles["menu-title"]}>
        {"<"}Cement Menu{"/>"}
      </div>

      <MenuItem />
    </div>
  );
};

export default menu;
