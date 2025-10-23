"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, Edit3 } from "lucide-react";

const Buttons = ({ itemdata }) => {
  const router = useRouter();
  const [data, setData] = useState(itemdata);
  const [isEditing, setIsEditing] = useState(false);

  const update = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({
          stock: parseInt(data.stock) || 0,
        })
        .eq("id", data.id);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const increment = () => {
    setData((prev) => ({ ...prev, stock: Number(data.stock) + 1 }));
  };

  const decrement = () => {
    if (data.stock > 0) {
      setData((prev) => ({ ...prev, stock: Number(data.stock) - 1 }));
    }
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    setData((prev) => ({ ...prev, stock: value }));
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${data.name}"? This action cannot be undone.`)) {
      try {
        const { error } = await supabase
          .from("inventory")
          .delete()
          .eq("id", data.id);
        
        if (error) throw error;
        
        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  useEffect(() => {
    update();
  }, [data.stock]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700 p-2"
        onClick={handleDelete}
        title="Delete product"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
        <button
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={decrement}
          disabled={data.stock <= 0}
          title="Decrease stock"
        >
          <Minus className="w-3 h-3" />
        </button>
        
        {isEditing ? (
          <input
            className="w-16 text-center input text-sm font-semibold bg-white border-gray-200"
            type="number"
            value={data?.stock}
            onChange={handleInput}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            min="0"
            autoFocus
          />
        ) : (
          <button
            className="w-16 h-8 text-center text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsEditing(true)}
            title="Click to edit stock"
          >
            {data?.stock}
          </button>
        )}
        
        <button
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
          onClick={increment}
          title="Increase stock"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
