import styles from "../../styles/page.module.css";
import Menu from "./menu";

const content = () => {
  return (
    <div className={styles.content}>
      <Menu />
    </div>
  );
};

export default content;
