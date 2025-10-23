"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/dataSlice";

const Total = ({ invoice }) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.data.price);

  const totalAmount = price.total;

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5 -mx-8 -mb-8 mt-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Total:</span>
          <span className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>
        {!invoice && (
          <div className="flex gap-3">
            <button className="btn btn-secondary" onClick={() => dispatch(clear())}>
              Clear All
            </button>
            <Link href="/details">
              <button className="btn btn-primary">Generate Invoice</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Total;
