"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";

const Price = ({ price, id }) => {
  const [data, setData] = useState(price);
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setData(value);
  };

  const update = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({ price: parseFloat(data) || 0 })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  useEffect(() => {
    if (data !== price) {
      update();
    }
  }, [data]);

  return (
    <div className="flex items-center border border-zinc-200 rounded-md px-2 py-1">
      <span className="text-xs text-zinc-400 mr-1">₹</span>
      {isEditing ? (
        <input
          className="w-16 text-center text-sm font-medium border-0 focus:outline-none focus:ring-0 bg-transparent"
          type="number"
          step="0.01"
          min="0"
          value={data}
          onChange={handleInput}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          autoFocus
        />
      ) : (
        <button
          className="text-sm font-medium text-zinc-900 hover:text-blue-600 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {data?.toLocaleString('en-IN')}
        </button>
      )}
    </div>
  );
};

export default Price;
