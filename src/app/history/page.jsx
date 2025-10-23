"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";

const History = () => {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

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

  const totalRevenue = data.reduce((acc, item) => acc + (item.total || 0), 0);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice History</h1>
        <p className="text-gray-600">View and filter your invoice history</p>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            className="input"
            value={dateFilter.from}
            onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            className="input"
            value={dateFilter.to}
            onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
          />
        </div>
        {(dateFilter.from || dateFilter.to) && (
          <button 
            className="btn btn-secondary mt-6"
            onClick={() => setDateFilter({ from: "", to: "" })}
          >
            Clear Filter
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoice history found</h3>
          <p className="text-sm">Generate some invoices to see them here.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data.map((invoice, index) => (
              <div className="card p-6 hover:shadow-md transition-shadow" key={invoice.invoiceno || index}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-blue-600 mb-1">
                      Invoice #{invoice.invoiceno}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{invoice.total?.toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {invoice.paymed}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Customer</div>
                    <div className="text-sm text-gray-900">{invoice.customer_name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Tax ID</div>
                    <div className="text-sm text-gray-900">{invoice.tax_id || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Payment Ref</div>
                    <div className="text-sm text-gray-900">{invoice.payref || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Shipping Contact</div>
                    <div className="text-sm text-gray-900">{invoice.shipping_contact || 'Same as customer'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Shipping Method</div>
                    <div className="text-sm text-gray-900">{invoice.shipping_method || 'N/A'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Items</div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {invoice.items?.filter(item => item.count > 0).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-600">Qty: {item.count}</span>
                      </div>
                    )) || (
                      <div className="text-sm text-gray-500">No items found</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 card p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">Total Revenue</div>
                <div className="text-sm text-gray-600">
                  {data.length} invoice{data.length !== 1 ? 's' : ''}
                  {(dateFilter.from || dateFilter.to) && ' (filtered)'}
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default History;
