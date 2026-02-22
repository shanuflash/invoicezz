"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/dataSlice";
import { Trash2, ArrowRight } from "lucide-react";

const Total = ({ invoice }) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.data.price);
  const data = useSelector((state) => state.data.data);
  const selectedItems = data.filter(item => item.count > 0);

  const totalAmount = price.total;
  const totalItems = selectedItems.reduce((sum, item) => sum + item.count, 0);
  const isEmpty = totalAmount === 0;

  return (
    <div className="sticky bottom-0 border-t border-zinc-200 -mx-6 -mb-6 mt-5 bg-zinc-50">
      {selectedItems.length > 0 && !invoice && (
        <div className="px-6 pt-3 pb-0 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-zinc-500">
          {selectedItems.map((item) => (
            <span key={item.id}>
              {item.name} <span className="text-zinc-400">×{item.count}</span> <span className="text-zinc-900 font-medium">₹{(item.price * item.count).toLocaleString("en-IN")}</span>
            </span>
          ))}
        </div>
      )}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className={`text-[15px] font-semibold ${isEmpty ? 'text-zinc-300' : 'text-zinc-900'}`}>
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
          <span className={`text-[12px] ${isEmpty ? 'text-zinc-300' : 'text-zinc-400'}`}>
            {isEmpty ? 'No items selected' : `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
          </span>
        </div>

        {!invoice && (
          <div className="flex items-center gap-1.5">
            <button
              className="btn btn-ghost text-[13px] text-zinc-400 hover:text-red-600"
              onClick={() => dispatch(clear())}
              disabled={isEmpty}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <Link href={isEmpty ? "#" : "/details"} onClick={(e) => isEmpty && e.preventDefault()}>
              <button
                className="btn btn-primary text-[13px]"
                disabled={isEmpty}
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Total;
