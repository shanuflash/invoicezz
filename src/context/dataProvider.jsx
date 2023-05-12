"use client";

import { createContext, useState } from "react";

export const dataContext = createContext();
const dataProvider = ({ children }) => {
  const initialState = [
    { name: "Cement A", id: 1, price: 100, count: 0 },
    { name: "Cement B", id: 2, price: 300, count: 0 },
    { name: "Cement C", id: 3, price: 350, count: 0 },
    { name: "Cement D", id: 4, price: 200, count: 0 },
    { name: "Cement E", id: 5, price: 175, count: 0 },
    // { name: "Cement F", id: 6, price: 225, count: 0 },
    // { name: "Cement G", id: 7, price: 125, count: 0 },
    // { name: "Cement H", id: 8, price: 100, count: 0 },
    // { name: "Cement I", id: 9, price: 75, count: 0 },
    // { name: "Cement J", id: 10, price: 100, count: 0 },
  ];
  const [tax, setTax] = useState(0);
  const [count, setCount] = useState(initialState);
  const [Data, setData] = useState({
    date: "",
    invoiceno: "",
    paymed: "",
    name: "",
    address: "",
    phoneno: "",
    delname: "",
    deladdress: "",
  });
  const [price, setPrice] = useState(0);

  return (
    <dataContext.Provider
      value={{
        tax,
        setTax,
        Data,
        setData,
        count,
        setCount,
        price,
        setPrice,
        initialState,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default dataProvider;
