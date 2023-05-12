"use client";
import { dataContext } from "@/context/dataProvider";
import styles from "@/styles/page.module.css";
import { useContext, useEffect, useState } from "react";
import Total from "@/components/total";
import numWords from "num-words";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import Link from "next/link";

const preview = () => {
  const { count, price, Data, tax } = useContext(dataContext);
  const { supabase } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [invoiceno, setInvoiceno] = useState("<generating>");

  const handleGenerate = async () => {
    setIsOpen(true);
  };

  const handleInvoiceno = async () => {
    const { data: olddata, error: olderror } = await supabase
      .from("history")
      .select("invoiceno")
      .order("invoiceno", { ascending: false })
      .limit(1);
    setInvoiceno(olddata[0].invoiceno + 1);
  };

  useEffect(() => {
    handleInvoiceno();
  }, []);

  const handlePrint = async () => {
    setIsOpen(false);
    window.print();
    const { data, error } = await supabase.from("history").insert([
      {
        ...Data,
        total: price + tax,
        invoiceno: Number(olddata[0].invoiceno + 1),
        items: count,
      },
    ]);
    if (error) console.log(error);
    else console.log(data);
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
          <button onClick={handlePrint}>Generate</button>
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
              Invoice No: {invoiceno}
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
                <br />
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
          <div className={styles["invoice-item-container"]}>
            <div className={styles["invoice-item"]}>
              <div className={styles["invoice-value"]}>CGST 14%</div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}>{parseInt(tax / 2)}</div>
            </div>
            <div className={styles["invoice-item"]}>
              <div className={styles["invoice-value"]}>SGST 14%</div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}></div>
              <div className={styles["invoice-value"]}>{parseInt(tax / 2)}</div>
            </div>
          </div>

          <Total invoice />
          <div className={styles["invoice-ammountinwords"]}>
            <div className={styles["invoice-ammountinwords-title"]}>
              Tax Amount in Words:
            </div>
            <div className={styles["invoice-ammountinwords-value"]}>
              {numWords(parseInt(tax)).toUpperCase()}
            </div>
          </div>
          <div className={styles["invoice-ammountinwords"]}>
            <div className={styles["invoice-ammountinwords-title"]}>
              Amount in Words:
            </div>
            <div className={styles["invoice-ammountinwords-value"]}>
              {numWords(parseInt(price + tax)).toUpperCase()}
            </div>
          </div>
          {/* <div className={styles["invoice-tax"]}>
            <div className={styles["invoice-tax-title"]}>Tax:</div>
            <div className={styles["invoice-tax-cgst"]}>
              <div className={styles["invoice-tax-name"]}>CGST 14%</div>
              <div className={styles["invoice-tax-value"]}>
                {parseInt(tax / 2)}
              </div>
            </div>
            <div className={styles["invoice-tax-sgst"]}>
              <div className={styles["invoice-tax-name"]}>SGST 14%</div>
              <div className={styles["invoice-tax-value"]}>
                {parseInt(tax / 2)}
              </div>
            </div>
          </div> */}
        </div>
        <div className={`${styles["button-container"]} ${styles.button}`}>
          <Link href="/details" style={{ width: "auto" }}>
            Previous
          </Link>
          <button style={{ width: "auto" }} onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default preview;
