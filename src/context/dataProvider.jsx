"use client";

import { useSupabase } from "@/app/supabase-provider";
import { createContext, useEffect, useState } from "react";

export const dataContext = createContext();
const dataProvider = ({ children }) => {
  const { supabase } = useSupabase();

  const [tax, setTax] = useState(0);
  const [data, setData] = useState();

  const [price, setPrice] = useState(0);

  const handleItems = async () => {
    let { data: inventory, error } = await supabase
      .from("inventory")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setData(
        Array(4).fill({
          name: "Failed to load",
          id: " Failed to load",
          price: " Failed to load",
          count: 0,
        })
      );
      console.log(error);
    } else setData(inventory);
  };

  useEffect(() => {
    handleItems();
  }, []);

  return (
    <dataContext.Provider
      value={{
        tax,
        setTax,
        data,
        setData,
        price,
        setPrice,
        handleItems,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default dataProvider;
