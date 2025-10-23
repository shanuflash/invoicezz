"use client";
import { useEffect, useState } from "react";
import Total from "@/components/total";
import numWords from "num-words";
import { supabase } from "@/app/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { empty } from "@/redux/formSlice";
import { clear } from "@/redux/dataSlice";
import "../../styles/print.css";

const preview = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const data = useSelector((state) => state.data.data);
  const price = useSelector((state) => state.data.price);
  const router = useRouter();
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
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Invoice</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This will add the current invoice to the database. Make sure
              to check the details before generating the invoice.
            </p>
            <div className="flex gap-3 justify-end">
              <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handlePrint}>
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="no-print mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Preview</h1>
        <p className="text-gray-600">Review your invoice before generating</p>
      </div>

      <div className="card p-8 mb-8 max-w-4xl mx-auto print-only">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">YOUR COMPANY NAME</h1>
            <div className="text-sm text-gray-600">
              <div>Your Company Address Line 1</div>
              <div>Your City, State - Postal Code, Country</div>
              <div className="mt-2">
                <div>Tax ID: YOUR-TAX-ID-HERE</div>
                <div>Email: your-email@example.com</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</div>
              <div><strong>Invoice No:</strong> INV/{invoiceno}/{new Date().getFullYear()}</div>
              <div><strong>Payment Method:</strong> {formData.paymed}</div>
              {formData.payref && <div><strong>Payment Ref:</strong> {formData.payref}</div>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 address-grid">
          <div className="address-section">
            <h3 className="font-semibold text-gray-900 mb-3">Bill To:</h3>
            <div className="text-sm text-gray-600 address-content">
              <div className="font-medium text-gray-900">{formData.customer_name}</div>
              <div className="whitespace-pre-line mt-1">{formData.billing_address}</div>
              {formData.tax_id && <div className="mt-2"><strong>Tax ID:</strong> {formData.tax_id}</div>}
            </div>
          </div>
          <div className="address-section">
            <h3 className="font-semibold text-gray-900 mb-3">Ship To:</h3>
            <div className="text-sm text-gray-600 address-content">
              {formData.shipping_contact && <div className="font-medium text-gray-900">{formData.shipping_contact}</div>}
              <div className="whitespace-pre-line mt-1">
                {formData.shipping_address || formData.billing_address}
              </div>
              {formData.shipping_method && <div className="mt-2"><strong>Shipping:</strong> {formData.shipping_method}</div>}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-900">
              <div>Item</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Unit Price</div>
              <div className="text-right">Total</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {data.filter(item => item.count > 0).map((item, idx) => (
              <div key={idx} className="px-6 py-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </div>
                  <div className="text-center">{item.count}</div>
                  <div className="text-right">₹{item.price}</div>
                  <div className="text-right font-medium">₹{(item.price * item.count).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">₹{price.total.toLocaleString("en-IN")}</span>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            <div><strong>Amount in Words:</strong> {numWords(parseInt(price.total)).toUpperCase()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Bank Name:</strong> Your Bank Name</div>
              <div><strong>Account Number:</strong> XXXX-XXXX-XXXX</div>
              <div><strong>Routing/SWIFT:</strong> YOUR-ROUTING-CODE</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
            <div className="text-sm text-gray-600">
              <p>Payment is due within 30 days of invoice date. Late payments may incur additional charges.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-end">
          <div className="text-xs text-gray-500">
            This is a computer generated invoice
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">YOUR COMPANY NAME</div>
            <div className="text-xs text-gray-500 mt-1">Authorized Signature</div>
          </div>
        </div>
      </div>

        <div className="no-print flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
          <Link href="/details" className="btn btn-secondary">
            Previous
          </Link>
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate Invoice
          </button>
        </div>
    </>
  );
};

export default preview;
