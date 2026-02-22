"use client";
import { useEffect, useState } from "react";
import InvoiceTemplate from "@/components/invoice-template";
import { supabase } from "@/app/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { empty } from "@/redux/formSlice";
import { clear } from "@/redux/dataSlice";
import "../../styles/print.css";

const Preview = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const data = useSelector((state) => state.data.data);
  const price = useSelector((state) => state.data.price);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceno, setInvoiceno] = useState("<generating>");

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
        setInvoiceno(1);
      }
    } catch (error) {
      console.error("Error fetching invoice number:", error);
      setInvoiceno(1);
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

      const totalAmount = price.total;
      const { error: historyError } = await supabase.from("history").insert([
        {
          ...formData,
          total: totalAmount,
          invoiceno: Number(invoiceno),
          items: data,
        },
      ]);

      if (historyError) throw historyError;
      const updatePromises = data
        .filter(item => item.count > 0)
        .map(item =>
          supabase
            .from("inventory")
            .update({ stock: item.stock - item.count })
            .eq("id", item.id)
        );

      const results = await Promise.all(updatePromises);

      const stockErrors = results.filter(r => r.error);
      if (stockErrors.length > 0) {
        console.error("Some stock updates failed:", stockErrors);
      }

      dispatch(empty());
      dispatch(clear());
      document.title = "Invoicezz";
      router.push("/");
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice. Please try again.");
      document.title = "Invoicezz";
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4 border border-zinc-200">
            <div className="px-5 py-4 border-b border-zinc-200">
              <h2 className="text-[15px] font-semibold text-zinc-900">Confirm Generation</h2>
            </div>
            <div className="px-5 py-4">
              <p className="text-[13px] text-zinc-600 leading-relaxed">
                This will save the invoice and update stock levels. Make sure the details are correct.
              </p>
            </div>
            <div className="flex gap-2 justify-end px-5 py-3 border-t border-zinc-100 bg-zinc-50 rounded-b-lg">
              <button className="btn btn-secondary text-[13px]" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary text-[13px]" onClick={handlePrint}>
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="no-print space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-900">Preview</h1>
          <div className="flex items-center gap-4 text-[13px] text-zinc-500">
            <span>INV/{invoiceno}/{new Date().getFullYear()}</span>
            <span className="text-zinc-300">|</span>
            <span className="font-medium text-zinc-900">₹{price.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5">
        <InvoiceTemplate
          formData={formData}
          items={data}
          total={price.total}
          invoiceno={invoiceno}
        />
      </div>

      <div className="no-print flex items-center justify-between pt-5 border-t border-zinc-200">
        <Link href="/details" className="btn btn-secondary text-[13px]">
          Back
        </Link>
        <button className="btn btn-primary text-[13px]" onClick={() => setIsOpen(true)}>
          Generate Invoice
        </button>
      </div>
    </>
  );
};

export default Preview;
