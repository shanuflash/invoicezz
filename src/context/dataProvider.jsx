"use client";

import { createContext, useState } from "react";

export const dataContext = createContext();

const dataProvider = ({ children }) => {
  const [count, setCount] = useState([
    { name: "Cement A", id: 1, price: 100, count: 0 },
    { name: "Cement B", id: 2, price: 50, count: 0 },
    { name: "Cement C", id: 3, price: 200, count: 0 },
    { name: "Cement D", id: 4, price: 350, count: 0 },
  ]);
  const [price, setPrice] = useState(0);

  return (
    <dataContext.Provider value={{ count, setCount, price, setPrice }}>
      {children}
    </dataContext.Provider>
  );
};

export default dataProvider;
