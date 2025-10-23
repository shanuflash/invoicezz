"use client";
import { useEffect, useState } from "react";

import { supabase } from "@/app/supabase";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
export const revalidate = 0;

const add = () => {
  const [newdata, setnewData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { error: insertError } = await supabase
        .from("inventory")
        .insert(newdata);
      
      if (insertError) throw insertError;
      
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };


  const handlegenerate = async () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handlegenerate}>
        Add Item
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Add New Item</h2>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  className="input w-full"
                  required
                  type="text"
                  placeholder="Enter item name"
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    className="input w-full"
                    required
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    onChange={(e) =>
                      setnewData((prev) => ({ ...prev, price: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    className="input w-full"
                    required
                    type="number"
                    placeholder="0"
                    onChange={(e) =>
                      setnewData((prev) => ({ ...prev, stock: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item ID (Optional)</label>
                <input
                  className="input w-full"
                  type="text"
                  placeholder="Auto-generated if empty"
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, id: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default add;
