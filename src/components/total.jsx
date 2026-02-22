"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/dataSlice";
import { FileText, Trash2 } from "lucide-react";

const Total = ({ invoice }) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.data.price);
  const data = useSelector((state) => state.data.data);
  const selectedItems = data.filter(item => item.count > 0);

  const totalAmount = price.total;
  const totalItems = selectedItems.reduce((sum, item) => sum + item.count, 0);

  if (totalAmount === 0 && !invoice) {
    return null;
  }

  return (
    <div className="sticky bottom-0 bg-zinc-50 border-t border-zinc-200 -mx-6 -mb-6 mt-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-2xl font-semibold text-zinc-900">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-zinc-500 ml-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            {selectedItems.length > 0 && !invoice && (
              <div className="flex gap-1.5 ml-2">
                {selectedItems.slice(0, 3).map((item) => (
                  <span key={item.id} className="badge badge-info">
                    {item.name} × {item.count}
                  </span>
                ))}
                {selectedItems.length > 3 && (
                  <span className="badge badge-info">
                    +{selectedItems.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {!invoice && (
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost text-zinc-500 hover:text-red-600"
                onClick={() => dispatch(clear())}
                disabled={totalAmount === 0}
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
              <Link href="/details">
                <button
                  className="btn btn-primary"
                  disabled={totalAmount === 0}
                >
                  <FileText className="w-4 h-4" />
                  Generate Invoice
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Total;
