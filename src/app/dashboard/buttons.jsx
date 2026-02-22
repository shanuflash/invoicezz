"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus } from "lucide-react";

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
    if (confirm(`Delete "${data.name}"?`)) {
      try {
        const { error } = await supabase
          .from("inventory")
          .delete()
          .eq("id", data.id);

        if (error) throw error;

        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item.");
      }
    }
  };

  useEffect(() => {
    update();
  }, [data.stock]);

  return (
    <div className="flex items-center gap-1.5">
      <button
        className="btn btn-ghost text-zinc-400 hover:text-red-600 p-1.5"
        onClick={handleDelete}
        title="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-1 border border-zinc-200 rounded-md p-0.5">
        <button
          className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={decrement}
          disabled={data.stock <= 0}
        >
          <Minus className="w-3 h-3" />
        </button>

        {isEditing ? (
          <input
            className="w-12 text-center text-sm font-medium border-0 focus:outline-none focus:ring-0 bg-transparent"
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
            className="w-12 h-7 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 rounded transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {data?.stock}
          </button>
        )}

        <button
          className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
          onClick={increment}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
