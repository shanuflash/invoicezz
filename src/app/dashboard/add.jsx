"use client";
import { useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export const revalidate = 0;

const Add = () => {
  const [newdata, setnewData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("inventory")
        .insert(newdata);

      if (insertError) throw insertError;

      setIsOpen(false);
      setnewData({});
      router.refresh();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4" />
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
              <h2 className="text-base font-semibold text-zinc-900">Add Product</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded flex items-center justify-center hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
                <input
                  className="input w-full"
                  required
                  type="text"
                  placeholder="Product name"
                  value={newdata.name || ''}
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Price (₹)</label>
                  <input
                    className="input w-full"
                    required
                    type="number"
                    placeholder="0"
                    step="0.01"
                    min="0"
                    value={newdata.price || ''}
                    onChange={(e) =>
                      setnewData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Stock</label>
                  <input
                    className="input w-full"
                    required
                    type="number"
                    placeholder="0"
                    min="0"
                    value={newdata.stock || ''}
                    onChange={(e) =>
                      setnewData((prev) => ({ ...prev, stock: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Product ID</label>
                <input
                  className="input w-full"
                  type="text"
                  placeholder="Auto-generated if empty"
                  value={newdata.id || ''}
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, id: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;
