"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";

const Buttons = ({ itemdata }) => {
  const router = useRouter();
  const [data, setData] = useState(itemdata);

  const update = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({
          stock: data.stock,
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
    setData((prev) => ({ ...prev, stock: e.target.value }));
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
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
  }, [data]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        onClick={handleDelete}
      >
        Delete
      </button>

      <div className="flex items-center gap-1">
        <button
          className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          onClick={decrement}
          disabled={data.stock <= 0}
        >
          -
        </button>
        <input
          className="w-16 text-center input text-sm font-semibold"
          type="number"
          value={data?.stock}
          onChange={handleInput}
          min="0"
        />
        <button
          className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-50"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Buttons;
