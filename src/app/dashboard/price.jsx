"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";
import { IndianRupee, Edit3 } from "lucide-react";

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
    <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
      <div className="flex items-center gap-1 px-2">
        <IndianRupee className="w-3 h-3 text-gray-500" />
        {isEditing ? (
          <input
            className="w-20 text-center input text-sm font-semibold bg-white border-gray-200"
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
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            onClick={() => setIsEditing(true)}
            title="Click to edit price"
          >
            {data?.toLocaleString('en-IN')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Price;
