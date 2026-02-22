"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState, useCallback } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import InvoiceTemplate from "@/components/invoice-template";
import "../../styles/print.css";

const PAGE_SIZE = 10;

const History = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [printInvoice, setPrintInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const getHistory = useCallback(async () => {
    setLoading(true);
    try {
      let countQuery = supabase
        .from("history")
        .select("*", { count: "exact", head: true });

      let dataQuery = supabase
        .from("history")
        .select("*")
        .order("invoiceno", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (dateFilter.from && dateFilter.to) {
        countQuery = countQuery.gte("date", dateFilter.from).lt("date", dateFilter.to);
        dataQuery = dataQuery.gte("date", dateFilter.from).lt("date", dateFilter.to);
      }

      const [countResult, dataResult] = await Promise.all([countQuery, dataQuery]);

      if (countResult.error) throw countResult.error;
      if (dataResult.error) throw dataResult.error;

      setTotalCount(countResult.count || 0);
      setData(dataResult.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, dateFilter]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    setPage(0);
  }, [dateFilter]);

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

  const pageRevenue = data.reduce((acc, item) => acc + (item.total || 0), 0);

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

      <div className="no-print space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-900">History</h1>
          <div className="flex items-center gap-4 text-[13px] text-zinc-500">
            <span>{totalCount} invoice{totalCount !== 1 ? 's' : ''}</span>
            <span className="text-zinc-300">|</span>
            <span className="font-medium text-zinc-900">₹{pageRevenue.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">From</label>
            <input
              type="date"
              className="input text-[13px]"
              value={dateFilter.from}
              onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">To</label>
            <input
              type="date"
              className="input text-[13px]"
              value={dateFilter.to}
              onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
            />
          </div>
          {(dateFilter.from || dateFilter.to) && (
            <button
              className="btn btn-secondary text-[13px]"
              onClick={() => setDateFilter({ from: "", to: "" })}
            >
              Clear
            </button>
          )}
        </div>

        {totalCount > PAGE_SIZE && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-zinc-500">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalCount)} of {totalCount}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="w-8 h-8 rounded border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i)
                .filter(i => i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1)
                .reduce((acc, i, idx, arr) => {
                  if (idx > 0 && i - arr[idx - 1] > 1) acc.push("...");
                  acc.push(i);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-zinc-400">…</span>
                  ) : (
                    <button
                      key={item}
                      className={`w-8 h-8 rounded border text-[13px] flex items-center justify-center transition-colors ${
                        item === page
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"
                      }`}
                      onClick={() => setPage(item)}
                    >
                      {item + 1}
                    </button>
                  )
                )}
              <button
                className="w-8 h-8 rounded border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Invoice</th>
                <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Customer</th>
                <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Items</th>
                <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Amount</th>
                <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-sm text-zinc-400">
                    <div className="spinner mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-sm text-zinc-400">
                    No invoices found.
                  </td>
                </tr>
              ) : data.map((invoice, index) => (
                <tr className="hover:bg-zinc-50/50 transition-colors" key={invoice.invoiceno || index}>
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-medium text-zinc-900">#{invoice.invoiceno}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {new Date(invoice.date).toLocaleDateString()} · {invoice.paymed}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[13px] text-zinc-900">{invoice.customer_name}</div>
                    {invoice.tax_id && (
                      <div className="text-[11px] text-zinc-400 mt-0.5">{invoice.tax_id}</div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {invoice.items?.filter(item => item.count > 0).slice(0, 3).map((item, idx) => (
                        <span key={idx} className="badge badge-info">
                          {item.name} × {item.count}
                        </span>
                      ))}
                      {(invoice.items?.filter(item => item.count > 0).length || 0) > 3 && (
                        <span className="badge badge-info">
                          +{invoice.items.filter(item => item.count > 0).length - 3}
                        </span>
                      )}
                      {(!invoice.items || invoice.items.filter(item => item.count > 0).length === 0) && (
                        <span className="text-[11px] text-zinc-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-[13px] font-medium text-zinc-900">
                      ₹{invoice.total?.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      className="w-7 h-7 rounded border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 transition-colors ml-auto"
                      onClick={() => setPrintInvoice(invoice)}
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;
