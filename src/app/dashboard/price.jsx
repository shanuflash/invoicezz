"use client";
import { supabase } from "@/app/supabase";
import { useEffect, useState } from "react";

const Price = ({ price, id }) => {
  const [data, setData] = useState(price);

  const handleInput = (e) => {
    setData(e.target.value);
  };

  const update = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({ price: data })
        .eq("id", id);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  useEffect(() => {
    update();
  }, [data]);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-600">₹</span>
      <input
        className="w-16 text-center input text-sm font-semibold"
        type="number"
        value={data}
        onChange={handleInput}
      />
    </div>
  );
};

export default Price;
