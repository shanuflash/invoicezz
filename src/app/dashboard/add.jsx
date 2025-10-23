"use client";
import { useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Plus, X, Package } from "lucide-react";

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

  const handlegenerate = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handlegenerate}>
        <Plus className="w-4 h-4" />
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
                  <p className="text-sm text-gray-500">Add a new item to your inventory</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleAdd} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  className="input w-full"
                  required
                  type="text"
                  placeholder="Enter product name"
                  value={newdata.name || ''}
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    className="input w-full"
                    required
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={newdata.price || ''}
                    onChange={(e) =>
                      setnewData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product ID (Optional)</label>
                <input
                  className="input w-full"
                  type="text"
                  placeholder="Auto-generated if empty"
                  value={newdata.id || ''}
                  onChange={(e) =>
                    setnewData((prev) => ({ ...prev, id: e.target.value }))
                  }
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate a unique ID</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
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
                      Add Product
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
