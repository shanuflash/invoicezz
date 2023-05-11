"use client";
import { dataContext } from "@/context/dataProvider";
import styles from "../../styles/page.module.css";
import { useContext } from "react";

// const initialState = {
//   count: 0,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { ...state, count: state.count + 1 };
//     case "DECREMENT":
//       return { ...state, count: state.count - 1 };
//     case "RESET":
//       return { ...state, count: 0 };
//     default:
//       return state;
//   }
// };

const menuItem = ({ id }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { count, setCount } = useContext(dataContext);
  const increment = () => {
    setCount((prev) => {
      return prev.map((item) => {
        if (item.id === Number(id + 1)) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
  };

  const decrement = () => {
    if (count[id]?.count > 0)
      setCount((prev) => {
        return prev.map((item) => {
          if (item.id === Number(id + 1)) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        });
      });
  };
  return (
    <div className={styles["menu-item"]}>
      <div className={styles["menu-left"]}>
        <div className={styles["menu-item-title"]}>Cement {id}</div>
        <div className={styles["menu-item-description"]}>
          This Cement is very good
        </div>
      </div>
      <div className={styles["menu-right"]}>
        <div className={styles["menu-item-price"]}>₹{count[id]?.price}</div>
        <div className={styles["menu-item-counter"]}>
          <div
            className={styles["menu-item-counter-button"]}
            onClick={decrement}
          >
            -
          </div>
          <input
            className={styles["menu-item-counter-value"]}
            style={{ width: `${count[id]?.count.toString().length + 0.5}ch` }}
            type="number"
            name="count"
            id="count"
            value={count[id]?.count}
            onChange={(e) => {
              setCount((prev) => {
                return prev.map((item) => {
                  if (item.id === Number(id + 1)) {
                    return { ...item, count: Number(e.target.value) };
                  }
                  return item;
                });
              });
            }}
          />
          {/* <div className={styles["menu-item-counter-value"]}>
            {count[id]?.count}
          </div> */}
          <div
            className={styles["menu-item-counter-button"]}
            onClick={increment}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default menuItem;
