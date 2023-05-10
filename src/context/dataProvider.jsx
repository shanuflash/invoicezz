"use client";

import { createContext, useState } from "react";

export const dataContext = createContext();

const dataProvider = ({ children }) => {
  const [count, setCount] = useState([
    { id: 1, price: 100, count: 0 },
    { id: 2, price: 50, count: 0 },
    { id: 3, price: 200, count: 0 },
    { id: 4, price: 350, count: 0 },
  ]);

  return (
    <dataContext.Provider value={{ count, setCount }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataProvider;
