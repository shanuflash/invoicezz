"use client";
import React, { useState, useEffect } from "react";
import { useSupabase } from "@/app/supabase-provider";

const search = () => {
  const [search, setsearch] = useState("");
  const [items, setItems] = useState([]);

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
      const { supabase } = useSupabase();

    useEffect(async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
      setItems(data);       
      
    }, []);

    const filteredItems = items.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
      <div>
        <input type="text" value={search} onChange={handleSearch} />
        {filteredItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  
}
export default search;