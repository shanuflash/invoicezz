"use client";
import { dataContext } from "@/context/dataProvider";
import styles from "@/styles/page.module.css";
import { useContext, useState } from "react";
import Total from "@/components/total";
import numWords from "num-words";
import { Dialog } from "@headlessui/react";

const preview = () => {
  const { count, price, Data } = useContext(dataContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className={isOpen ? styles.backdrop : styles.backdropoff} />
      <Dialog
        className={styles.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Generate Invoice</Dialog.Title>
          <Dialog.Description>
            This will add the currend invoice to the database. <br /> Make sure
            to check the details before generating the invoice. <br /> Check for
            the preview at the bottom of the site.
          </Dialog.Description>

          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button
            onClick={() => {
              setIsOpen(false);
              window.print();
            }}
          >
            Generate
          </button>
        </Dialog.Panel>
      </Dialog>
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
            <div className={styles["invoice-number"]}>
              Invoice No: {Data.invoiceno}
            </div>
            <div className={styles["invoice-method"]}>
              Payment Method: {Data.paymed}
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
              <div className={styles["invoice-buyer-name"]}>{Data.name}</div>
              <div className={styles["invoice-buyer-address"]}>
                {Data.address}
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
                {Data.delname}
                {Data.deladdress}
              </div>
              <div className={styles["invoice-delivery-method"]}>
                Despatched through: {/*fill*/}
              </div>
            </div>
          </div>
          {/*  */}
          <div className={styles.divider} />
          {/*  */}
          <div className={styles["invoice-item-container"]}>
            <div className={styles["invoice-title"]}>
              <div className={styles["invoice-title-text"]}>Item</div>
              <div className={styles["invoice-title-text"]}>HSN/SAC</div>
              <div className={styles["invoice-title-text"]}>Quantity</div>
              <div className={styles["invoice-title-text"]}>Price</div>
              <div className={styles["invoice-title-text"]}>Amount</div>
            </div>
            {count?.map((item) => {
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
          </div>
          [GST WIP]
          <Total invoice />
          <div className="invoice-ammountinworkds">
            <div className="invoice-ammountinwords-title">Amount in Words:</div>
            <div className="invoice-ammountinwords-value">
              {numWords(price).toUpperCase()}
            </div>
          </div>
        </div>
        <button onClick={handleGenerate}>handleGenerate</button>
      </div>
    </>
  );
};

export default preview;
