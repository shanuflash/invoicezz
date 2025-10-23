"use client";
import Total from "@/components/total";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, input } from "@/redux/dataSlice";
import { FileText, Package, ShoppingCart, Minus, Plus } from "lucide-react";

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
          <div className="spinner w-8 h-8 mx-auto mb-4 text-indigo-600"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading inventory...</h3>
          <p className="text-sm text-gray-500">Please wait while we fetch your items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Create Invoice</h1>
          <p className="text-gray-600">Select items and quantities to generate your invoice</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Selected Items</div>
            <div className="text-lg font-semibold text-gray-900">{selectedItems.length}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Amount</div>
            <div className="text-lg font-semibold gradient-text">₹{totalPrice.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Available Products</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.length}</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Items in Cart</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{selectedItems.length}</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Invoice Total</span>
          </div>
          <div className="text-2xl font-bold gradient-text">₹{totalPrice.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Select Products</h2>
          <p className="text-sm text-gray-500 mt-1">Choose items and quantities for your invoice</p>
        </div>

        {data.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items available</h3>
            <p className="text-gray-500 mb-6">Add items to your inventory first to create invoices.</p>
            <a href="/dashboard" className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add Products
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.map((item, i) => (
              <div className="p-6 hover:bg-gray-50/50 transition-colors animate-slide-up" key={item.id || i}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{item?.name}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                          ID: {item?.id}
                        </span>
                        {item?.count > 0 && (
                          <span className="badge badge-info">
                            {item.count} selected
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Price: ₹{item?.price?.toLocaleString('en-IN')}</span>
                        <span>•</span>
                        <span>Available: {item?.stock} units</span>
                        {item?.count > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-sky-600 font-medium">
                              Subtotal: ₹{(item?.price * item?.count)?.toLocaleString('en-IN')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {item?.stock > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          onClick={() => dispatch(decrement(item.id))}
                          disabled={item?.count === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          className="w-20 text-center input font-semibold"
                          type="number"
                          value={item?.count || 0}
                          onChange={(e) =>
                            dispatch(input({ value: e.target.value, id: item.id }))
                          }
                          min="0"
                          max={item?.stock}
                        />
                        <button
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          onClick={() => dispatch(increment(item.id))}
                          disabled={item?.count >= item?.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-danger">
                        Out of stock
                      </span>
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
