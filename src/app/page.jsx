"use client";
import Total from "@/components/total";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, input } from "@/redux/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-600">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading inventory...</h3>
        <p className="text-sm">Please wait while we fetch your items.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Invoice</h1>
        <p className="text-gray-600">Add items to generate your invoice</p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items available</h3>
          <p className="text-sm">Add items to your inventory first to create invoices.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, i) => (
            <div className="card p-5 flex items-center justify-between hover:shadow-md transition-shadow" key={item.id || i}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{item?.name}</div>
                  <div className="text-sm text-gray-500">
                    ID {item?.id}
                    {item?.stock && ` • ${item?.stock} in stock`}
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mr-6">₹{item?.price}</div>
              </div>

              <div className="flex items-center gap-4">
                {item?.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => dispatch(decrement(item.id))}
                      disabled={item?.count === 0}
                    >
                      −
                    </button>
                    <input
                      className="w-16 text-center input font-semibold"
                      type="number"
                      value={item?.count || 0}
                      onChange={(e) =>
                        dispatch(input({ value: e.target.value, id: item.id }))
                      }
                      min="0"
                      max={item?.stock}
                    />
                    <button
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => dispatch(increment(item.id))}
                      disabled={item?.count >= item?.stock}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded uppercase tracking-wide">
                    Out of stock
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Total invoice={false} />
    </>
  );
};

export default Home;
