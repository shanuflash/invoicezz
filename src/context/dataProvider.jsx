"use client";

import { createContext, useState } from "react";

export const dataContext = createContext();
const dataProvider = ({ children }) => {
  const [tax, setTax] = useState(0);

  const [price, setPrice] = useState(0);

  return (
    <dataContext.Provider
      value={{
        tax,
        setTax,
        price,
        setPrice,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default dataProvider;
