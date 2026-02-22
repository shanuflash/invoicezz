"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus } from "lucide-react";

const DEBOUNCE_MS = 800;

const Buttons = ({ itemdata }) => {
  const router = useRouter();
  const [stock, setStock] = useState(itemdata.stock);
  const [saving, setSaving] = useState(false);
  const savedRef = useRef(itemdata.stock);
  const timerRef = useRef(null);

  const isDirty = stock !== savedRef.current;

  const save = useCallback(async (value) => {
    if (value === savedRef.current) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("inventory")
        .update({ stock: parseInt(value) || 0 })
        .eq("id", itemdata.id);

      if (error) throw error;
      savedRef.current = value;
    } catch (error) {
      console.error("Error updating stock:", error);
    } finally {
      setSaving(false);
    }
  }, [itemdata.id]);

  const debouncedSave = useCallback((value) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => save(value), DEBOUNCE_MS);
  }, [save]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const updateStock = (newValue) => {
    setStock(newValue);
    debouncedSave(newValue);
  };

  const handleDelete = async () => {
    if (confirm(`Delete "${itemdata.name}"?`)) {
      try {
        const { error } = await supabase
          .from("inventory")
          .delete()
          .eq("id", itemdata.id);

        if (error) throw error;
        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item.");
      }
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        className="btn btn-ghost text-zinc-400 hover:text-red-600 p-1.5"
        onClick={handleDelete}
        title="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      <div className={`flex items-center gap-1 border rounded-md p-0.5 transition-colors ${saving ? "border-zinc-300 bg-zinc-50" : isDirty ? "border-amber-300 bg-amber-50/50" : "border-zinc-200"}`}>
        <button
          className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={() => updateStock(Math.max(0, Number(stock) - 1))}
          disabled={stock <= 0}
        >
          <Minus className="w-3 h-3" />
        </button>

        <input
          className="w-12 text-center text-sm font-medium border-0 focus:outline-none focus:ring-0 bg-transparent"
          type="number"
          value={stock}
          onChange={(e) => updateStock(parseInt(e.target.value) || 0)}
          min="0"
        />

        <button
          className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
          onClick={() => updateStock(Number(stock) + 1)}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
