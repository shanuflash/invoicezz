"use client";
import { supabase } from "@/app/supabase";
import { useState, useRef, useCallback, useEffect } from "react";

const DEBOUNCE_MS = 800;

const Price = ({ price, id }) => {
  const [value, setValue] = useState(price);
  const [saving, setSaving] = useState(false);
  const savedRef = useRef(price);
  const timerRef = useRef(null);

  const isDirty = value !== savedRef.current;

  const save = useCallback(async (val) => {
    if (val === savedRef.current) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("inventory")
        .update({ price: parseFloat(val) || 0 })
        .eq("id", id);

      if (error) throw error;
      savedRef.current = val;
    } catch (error) {
      console.error("Error updating price:", error);
    } finally {
      setSaving(false);
    }
  }, [id]);

  const debouncedSave = useCallback((val) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => save(val), DEBOUNCE_MS);
  }, [save]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const updateValue = (newVal) => {
    setValue(newVal);
    debouncedSave(newVal);
  };

  return (
    <div className={`flex items-center border rounded-md px-2 py-1 transition-colors ${saving ? "border-zinc-300 bg-zinc-50" : isDirty ? "border-amber-300 bg-amber-50/50" : "border-zinc-200"}`}>
      <span className="text-xs text-zinc-400 mr-1">₹</span>
      <input
        className="w-16 text-center text-sm font-medium border-0 focus:outline-none focus:ring-0 bg-transparent"
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
};

export default Price;
