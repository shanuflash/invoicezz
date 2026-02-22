"use client";
import Total from "@/components/total";
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
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="spinner w-6 h-6 mx-auto mb-3 text-blue-600"></div>
          <p className="text-sm text-zinc-500">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Create Invoice</h1>
        <div className="flex items-center gap-5 text-sm">
          <div>
            <span className="text-zinc-500">Items </span>
            <span className="font-medium text-zinc-900">{selectedItems.length}</span>
          </div>
          <div>
            <span className="text-zinc-500">Total </span>
            <span className="font-medium text-zinc-900">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="px-5 py-3 border-b border-zinc-200">
          <h2 className="text-sm font-medium text-zinc-900">Products</h2>
        </div>

        {data.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Package className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 mb-4">No items in inventory yet.</p>
            <a href="/dashboard" className="btn btn-primary text-sm">
              Add Products
            </a>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {data.map((item, i) => (
              <div className="px-5 py-3 hover:bg-zinc-50/60 transition-colors" key={item.id || i}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-zinc-900">{item?.name}</span>
                      {item?.count > 0 && (
                        <span className="badge badge-info">{item.count} selected</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>₹{item?.price?.toLocaleString('en-IN')}</span>
                      <span className="text-zinc-300">/</span>
                      <span>{item?.stock} in stock</span>
                      {item?.count > 0 && (
                        <>
                          <span className="text-zinc-300">/</span>
                          <span className="text-blue-600 font-medium">
                            ₹{(item?.price * item?.count)?.toLocaleString('en-IN')} subtotal
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {item?.stock > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          onClick={() => dispatch(decrement(item.id))}
                          disabled={item?.count === 0}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          className="w-14 text-center input text-sm font-medium py-1.5"
                          type="number"
                          value={item?.count || 0}
                          onChange={(e) =>
                            dispatch(input({ value: e.target.value, id: item.id }))
                          }
                          min="0"
                          max={item?.stock}
                        />
                        <button
                          className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          onClick={() => dispatch(increment(item.id))}
                          disabled={item?.count >= item?.stock}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-danger">Out of stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Total invoice={false} />
    </div>
  );
};

export default Home;
