"use client";
import Total from "@/components/total";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, input } from "@/redux/dataSlice";
import { Package, Minus, Plus } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const totalPrice = useSelector((state) => state.data.price.total);
  const selectedItems = data.filter(item => item.count > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="spinner w-5 h-5 mx-auto mb-3 text-zinc-400"></div>
          <p className="text-sm text-zinc-400">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Create Invoice</h1>
        <div className="flex items-center gap-4 text-[13px] text-zinc-500">
          <span>{selectedItems.length} selected</span>
          <span className="text-zinc-300">|</span>
          <span className="font-medium text-zinc-900">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Product</th>
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Price</th>
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Stock</th>
              <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-14 text-center">
                  <Package className="w-7 h-7 text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400 mb-3">No items in inventory.</p>
                  <Link href="/dashboard" className="btn btn-primary text-[13px]">Add Products</Link>
                </td>
              </tr>
            ) : data.map((item, i) => (
              <tr className="hover:bg-zinc-50/50 transition-colors" key={item.id || i}>
                <td className="px-5 py-3">
                  <span className="text-[13px] font-medium text-zinc-900">{item?.name}</span>
                </td>
                <td className="px-5 py-3 text-[13px] text-zinc-600">₹{item?.price?.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3 text-[13px] text-zinc-600">{item?.stock}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end">
                    {item?.stock > 0 ? (
                      <div className="flex items-center gap-1">
                        <button
                          className="w-7 h-7 rounded border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          onClick={() => dispatch(decrement(item.id))}
                          disabled={item?.count === 0}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          className="w-12 text-center text-[13px] font-medium border border-zinc-200 rounded py-1 focus:outline-none focus:border-zinc-900 bg-white"
                          type="number"
                          value={item?.count || 0}
                          onChange={(e) =>
                            dispatch(input({ value: e.target.value, id: item.id }))
                          }
                          min="0"
                          max={item?.stock}
                        />
                        <button
                          className="w-7 h-7 rounded border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          onClick={() => dispatch(increment(item.id))}
                          disabled={item?.count >= item?.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-danger">Out of stock</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Total invoice={false} />
    </div>
  );
};

export default Home;
