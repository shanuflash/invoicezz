"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/dataSlice";
import { FileText, Trash2, Calculator } from "lucide-react";

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
    <div className="sticky bottom-0 bg-white border-t border-gray-100 -mx-8 -mb-8 mt-8">
      <div className="p-6">
        <div className="card p-6 bg-gradient-to-r from-sky-50 to-cyan-50 border-sky-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Invoice Summary</div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold gradient-text">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                    <div className="text-sm text-gray-500">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} • {selectedItems.length} {selectedItems.length === 1 ? 'product' : 'products'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {!invoice && (
              <div className="flex items-center gap-3">
                <button 
                  className="btn btn-ghost text-gray-600 hover:text-red-600" 
                  onClick={() => dispatch(clear())}
                  disabled={totalAmount === 0}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
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
          
          {selectedItems.length > 0 && !invoice && (
            <div className="mt-4 pt-4 border-t border-sky-200">
              <div className="text-sm text-gray-600 mb-2">Selected Items:</div>
              <div className="flex flex-wrap gap-2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Total;
