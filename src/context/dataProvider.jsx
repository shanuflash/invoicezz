"use client";

import { createContext, useState, useRef } from "react";

export const dataContext = createContext();
const [Data, setData] = useState({
  Date: "",
  InvoiceNo: "",
  Paymed: "",
  Name: "",
  Address: "",
  PhoneNo: "",
  DelName: "",
  DelAddress: "",
});
const dataProvider = ({ children }) => {
  const initialState = [
    { name: "Cement A", id: 1, price: 100, count: 0 },
    { name: "Cement B", id: 2, price: 50, count: 0 },
    { name: "Cement C", id: 3, price: 350, count: 0 },
    { name: "Cement D", id: 4, price: 200, count: 0 },
    { name: "Cement E", id: 5, price: 175, count: 0 },
    { name: "Cement F", id: 6, price: 225, count: 0 },
    { name: "Cement G", id: 7, price: 125, count: 0 },
    { name: "Cement H", id: 8, price: 100, count: 0 },
    { name: "Cement I", id: 9, price: 75, count: 0 },
    { name: "Cement J", id: 10, price: 100, count: 0 },
  ];
  const [count, setCount] = useState(() => {
    if (typeof window !== "undefined") {
      let count = JSON.parse(localStorage.getItem("count"));
      return count ? count : initialState;
    }
  });
  const [price, setPrice] = useState(0);

  return (
    <dataContext.Provider
      value={{
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
