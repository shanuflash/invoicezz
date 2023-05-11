// import { dataContext } from "@/context/dataProvider";
import styles from "../styles/page.module.css";
import Invoice from "./invoice";
// import { useContext } from "react";
import Total from "./total";
import numWords from "num-words";

const preview = () => {
  // const { count, price } = useContext(dataContext);
  return (
    <div className={styles.menu}>
      <div className={styles["menu-title"]}>Preview</div>

      <div className={styles.print}>
        <div className={styles.left}>
          <div className={styles["invoice-company-name"]}>
            SARAVANAN TRADERS
          </div>
          <div className={styles["invoice-company-address"]}>
            No.2/32, Kakkan Nagar, 2nd Cross Street, <br />
            Adambakkam, Chennai - 600088, Tamilnadu.
          </div>
          <div className={styles["invoice-company-contact"]}>
            GSTIN: 33BAZPS2766P1ZI <br /> Email: saravanantraderss@gmail.com
          </div>
        </div>
        {/*  */}
        <div className={styles.right}>
          <div className={styles["invoice-date"]}>
            Date: {new Date().toLocaleDateString("en-IN")}
          </div>
          <div className={styles["invoice-number"]}>Invoice No: {/*fill*/}</div>
          <div className={styles["invoice-method"]}>
            Payment Method: {/*fill*/}
          </div>
        </div>
        {/*  */}
        <div className={styles.divider} />
        {/*  */}
        <div className={styles.left}>
          <div className={styles["invoice-buyer"]}>
            <div className={styles["invoice-buyer-title"]}>
              Buyer: (Name and Address)
            </div>
            <div className={styles["invoice-buyer-name"]}>
              <br /> {/*fill*/}
            </div>
            <div className={styles["invoice-buyer-address"]}>
              <br /> {/*fill*/}
              <br /> {/*fill*/}
            </div>
            <div className={styles["invoice-buyer-contact"]}>
              GSTIN: {/*fill*/}
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.right}>
          <div className={styles["invoice-delivery"]}>
            <div className={styles["invoice-delivery-title"]}>
              Delivery Address:
            </div>
            <div className={styles["invoice-delivery-address"]}>
              <br /> {/*fill*/}
              <br /> {/*fill*/}
              <br /> {/*fill*/}
            </div>
            <div className={styles["invoice-delivery-method"]}>
              Despatched through: {/*fill*/}
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.divider} />
        {/*  */}
        <Invoice />
        {/* <div className={styles["invoice-item-container"]}>
          <div className={styles["invoice-title"]}>
            <div className={styles["invoice-title-text"]}>Item</div>
            <div className={styles["invoice-title-text"]}>HSN/SAC</div>
            <div className={styles["invoice-title-text"]}>Quantity</div>
            <div className={styles["invoice-title-text"]}>Price</div>
            <div className={styles["invoice-title-text"]}>Amount</div>
          </div>
          {count.map((item) => {
            if (item.count > 0) {
              return (
                <div className={styles["invoice-item"]}>
                  <div className={styles["invoice-value"]}>{item.name}</div>
                  <div className={styles["invoice-value"]}>123</div>
                  <div className={styles["invoice-value"]}>{item.count}</div>
                  <div className={styles["invoice-value"]}>{item.price}</div>
                  <div className={styles["invoice-value"]}>
                    {item.price * item.count}
                  </div>
                </div>
              );
            }
          })}
        </div> */}
        [GST WIP]
        <Total invoice />
        <div className="invoice-ammountinworkds">
          <div className="invoice-ammountinwords-title">Amount in Words:</div>
          <div className="invoice-ammountinwords-value">
            {/* {numWords(price).toUpperCase()} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default preview;
