"use client";

import styles from "@/styles/page.module.css";
import { useEffect, useState } from "react";
import Total from "@/components/total";
import numWords from "num-words";
import { Dialog } from "@headlessui/react";

import { supabase } from "@/app/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { empty } from "@/redux/formSlice";

const preview = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const data = useSelector((state) => state.data.data);
  const price = useSelector((state) => state.data.price);
  const tax = useSelector((state) => state.data.tax);
  const router = useRouter();

  // Using supabase client without auth
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceno, setInvoiceno] = useState("<generating>");

  const handleGenerate = async () => {
    setIsOpen(true);
  };

  const handleInvoiceno = async () => {
    try {
      const { data: olddata, error } = await supabase
        .from("history")
        .select("invoiceno")
        .order("invoiceno", { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (olddata && olddata.length > 0) {
        setInvoiceno(olddata[0].invoiceno + 1);
      } else {
        setInvoiceno(1); // First invoice
      }
    } catch (error) {
      console.error("Error fetching invoice number:", error);
      setInvoiceno(1); // Default to 1 if error
    }
  };

  useEffect(() => {
    handleInvoiceno();
  }, []);

  const handlePrint = async () => {
    try {
      document.title = invoiceno.toString();
      setIsOpen(false);
      window.print();
      
      // Calculate total
      const totalAmount = price.total;
      
      // Insert invoice history
      const { error: historyError } = await supabase.from("history").insert([
        {
          ...formData,
          total: totalAmount,
          invoiceno: Number(invoiceno),
          items: data,
        },
      ]);

      if (historyError) throw historyError;

      // Update inventory stock
      const updatePromises = data
        .filter(item => item.count > 0)
        .map(item => 
          supabase
            .from("inventory")
            .update({ stock: item.stock - item.count })
            .eq("id", item.id)
        );

      const results = await Promise.all(updatePromises);
      
      // Check for errors in stock updates
      const stockErrors = results.filter(r => r.error);
      if (stockErrors.length > 0) {
        console.error("Some stock updates failed:", stockErrors);
      }

      // Reset form and redirect
      dispatch(empty());
      document.title = "Invoice Generator";
      router.push("/");
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice. Please try again.");
      document.title = "Invoice Generator";
    }
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
          <div className={styles.invoice}>
            <div className={styles.left}>
              <div className={styles["invoice-company-name"]}>
                YOUR COMPANY NAME
              </div>
              <div className={styles["invoice-company-address"]}>
                Your Company Address Line 1, <br />
                Your City, State - Postal Code, Country.
              </div>
              <div className={styles["invoice-company-contact"]}>
                GSTIN: YOUR-GSTIN-HERE <br /> Email: your-email@example.com
              </div>
            </div>
            {/*  */}
            <div className={styles.right}>
              <div className={styles["invoice-date"]}>
                Date: {new Date().toLocaleDateString("en-IN")}
              </div>
              <div className={styles["invoice-number"]}>
                Invoice No: INV/{invoiceno}/{new Date().getFullYear()}
              </div>
              <div className={styles["invoice-method"]}>
                Payment Method: {formData.paymed}
              </div>
              <div>Payment Reference: {formData.payref}</div>
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
                  {formData.name}
                </div>
                <div className={styles["invoice-buyer-address"]}>
                  {formData.address}
                </div>
                <div className={styles["invoice-buyer-contact"]}>
                  GSTIN: {formData.gstin}
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
                  {formData.delname}
                  <br />
                  {formData.deladdress}
                </div>
                <div className={styles["invoice-delivery-method"]}>
                  Despatched through: {formData.disthro}
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
              {Object.keys(price).map((item, idx) => {
                if (price[item] > 0 && item !== "total") {
                  const filteredData = data.filter((d) => d.type === item);
                  const gst = filteredData[0]?.gst || 0;
                  return (
                    <div key={idx}>
                      <span>{item}</span>
                      <div className={styles["invoice-item-container"]}>
                        {filteredData?.map((item, itemIdx) => (
                          <div className={styles["invoice-item"]} key={itemIdx}>
                            <div className={styles["invoice-value"]}>
                              {item.name}
                            </div>
                            <div className={styles["invoice-value"]}>123</div>
                            <div className={styles["invoice-value"]}>
                              {item.count}
                            </div>
                            <div className={styles["invoice-value"]}>
                              {item.price}
                            </div>
                            <div className={styles["invoice-value"]}>
                              {item.price * item.count}
                            </div>
                          </div>
                        ))}
                        <div className={styles["invoice-item"]}>
                          <div className={styles["invoice-value"]}>
                            CGST {((gst * 100) / 2).toFixed(2)}%
                          </div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}>
                            {parseInt(tax[item] / 2)}
                          </div>
                        </div>
                        <div className={styles["invoice-item"]}>
                          <div className={styles["invoice-value"]}>
                            SGST {((gst * 100) / 2).toFixed(2)}%
                          </div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}></div>
                          <div className={styles["invoice-value"]}>
                            {parseInt(tax[item] / 2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <Total invoice />
            <div className={styles.divider} />
            <div style={{ display: "flex", width: "100%" }}>
              <div className={styles["left"]}>
                <div className={styles["invoice-ammountinwords"]}>
                  <div className={styles["invoice-ammountinwords-title"]}>
                    Tax Amount in Words:
                  </div>
                  <div className={styles["invoice-ammountinwords-value"]}>
                    {numWords(
                      parseInt(
                        Object.values(tax).reduce(
                          (sum, value) => sum + value,
                          0
                        )
                      )
                    ).toUpperCase()}
                  </div>
                </div>
                <div className={styles["invoice-ammountinwords"]}>
                  <div className={styles["invoice-ammountinwords-title"]}>
                    Amount in Words:
                  </div>
                  <div className={styles["invoice-ammountinwords-value"]}>
                    {numWords(parseInt(price.total)).toUpperCase()}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles["right"]} style={{ width: "100%" }}>
                  <div className={styles["invoice-bank"]}>
                    Bank Name: Your Bank Name
                  </div>
                  <div className={styles["invoice-bank"]}>
                    Account Number: XXXX-XXXX-XXXX
                  </div>
                  <div className={styles["invoice-bank"]}>
                    Branch/IFSC Code: YOUR-BRANCH/IFSC-CODE
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles["invoice-declaration"]}>
              <div className={styles["invoice-declaration-item"]}>
                <div className={styles["invoice-declaration-title"]}>
                  Declaration:
                </div>
                We Declare that this invoice shows the actual price of the goods
                described and that all particulars are true and correct.
              </div>
              <div className={styles["invoice-declaration-item"]}>
                <div className={styles["invoice-declaration-title"]}>
                  For YOUR COMPANY NAME
                  <div className={styles["invoice-declaration-signature"]}>
                    Authorised Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["disclaimer"]}>
            This is a Computer Generated Invoice
          </div>
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
