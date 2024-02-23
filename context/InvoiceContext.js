"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import "dotenv/config";
// import { options } from "@/utils";
import data from "../utils/data.json";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [filteredData, setFilteredData] = useState();
  const [filterStatus, setFilterStatus] = useState("all");
  const [addInvoice, setAddInvoice] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch(`https://api.invoice-app.naughty-cat.com/user`)
      .then((response) => response.json())
      .then((response) => {
        setUserData(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterClick = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <InvoiceContext.Provider
      value={{
        filterStatus,
        setFilterStatus,
        filteredData,
        setFilteredData,
        handleFilterClick,
        addInvoice,
        setAddInvoice,
        editInvoice,
        setEditInvoice,
        isDemo,
        setIsDemo,
        userData, setUserData
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
