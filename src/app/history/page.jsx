"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import InvoiceTemplate from "@/components/invoice-template";
import "../../styles/print.css";

const History = () => {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });
  const [printInvoice, setPrintInvoice] = useState(null);

  const getHistory = async () => {
    try {
      let query = supabase
        .from("history")
        .select("*")
        .order("invoiceno", { ascending: false });

      if (dateFilter.from && dateFilter.to) {
        query = query.gte("date", dateFilter.from).lt("date", dateFilter.to);
      }

      const { data: historyData, error } = await query;

      if (error) throw error;

      setData(historyData || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setData([]);
    }
  };

  useEffect(() => {
    getHistory();
  }, [dateFilter]);

  const handleDownload = (invoice) => {
    setPrintInvoice(invoice);
  };

  useEffect(() => {
    if (!printInvoice) return;

    const timer = setTimeout(() => {
      const prevTitle = document.title;
      document.title = `INV-${printInvoice.invoiceno}`;
      window.print();
      document.title = prevTitle;
      setPrintInvoice(null);
    }, 100);

    return () => clearTimeout(timer);
  }, [printInvoice]);

  const totalRevenue = data.reduce((acc, item) => acc + (item.total || 0), 0);

  return (
    <>
      {printInvoice && (
        <div className="print-only">
          <InvoiceTemplate
            formData={{
              date: printInvoice.date,
              paymed: printInvoice.paymed,
              payref: printInvoice.payref,
              customer_name: printInvoice.customer_name,
              billing_address: printInvoice.billing_address,
              tax_id: printInvoice.tax_id,
              shipping_contact: printInvoice.shipping_contact,
              shipping_address: printInvoice.shipping_address,
              shipping_method: printInvoice.shipping_method,
            }}
            items={printInvoice.items || []}
            total={printInvoice.total}
            invoiceno={printInvoice.invoiceno}
          />
        </div>
      )}

      <div className="no-print">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900">History</h1>
        </div>

        <div className="mb-5 flex gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">From</label>
            <input
              type="date"
              className="input"
              value={dateFilter.from}
              onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">To</label>
            <input
              type="date"
              className="input"
              value={dateFilter.to}
              onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
            />
          </div>
          {(dateFilter.from || dateFilter.to) && (
            <button
              className="btn btn-secondary"
              onClick={() => setDateFilter({ from: "", to: "" })}
            >
              Clear
            </button>
          )}
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-sm text-zinc-500">
            No invoices found.
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {data.map((invoice, index) => (
                <div className="card px-5 py-4" key={invoice.invoiceno || index}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-medium text-zinc-900">
                        Invoice #{invoice.invoiceno}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {new Date(invoice.date).toLocaleDateString()} · {invoice.paymed}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold text-zinc-900">
                        ₹{invoice.total?.toLocaleString("en-IN")}
                      </div>
                      <button
                        className="btn btn-secondary py-1.5 px-2.5"
                        onClick={() => handleDownload(invoice)}
                        title="Download invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                    <div>
                      <span className="text-zinc-500">Customer</span>
                      <div className="text-zinc-900">{invoice.customer_name}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Tax ID</span>
                      <div className="text-zinc-900">{invoice.tax_id || '—'}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Payment Ref</span>
                      <div className="text-zinc-900">{invoice.payref || '—'}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Shipping</span>
                      <div className="text-zinc-900">{invoice.shipping_method || '—'}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Items</div>
                    <div className="flex flex-wrap gap-1.5">
                      {invoice.items?.filter(item => item.count > 0).map((item, idx) => (
                        <span key={idx} className="badge badge-info">
                          {item.name} × {item.count}
                        </span>
                      )) || (
                        <span className="text-xs text-zinc-400">No items</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between px-1 text-sm">
              <span className="text-zinc-500">
                {data.length} invoice{data.length !== 1 ? 's' : ''}
                {(dateFilter.from || dateFilter.to) && ' (filtered)'}
              </span>
              <div>
                <span className="text-zinc-500">Total </span>
                <span className="font-semibold text-zinc-900">₹{totalRevenue.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default History;
