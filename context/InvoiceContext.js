"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import "dotenv/config";
// import { options } from "@/utils";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [filteredData, setFilteredData] = useState();
  const [status, setStatus] = useState("all");
  const [addInvoice, setAddInvoice] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);

  const handleFilterClick = (e) => {
    setStatus(e.target.value);
  };

  return (
    <InvoiceContext.Provider
      value={{
        status,
        setStatus,
        filteredData,
        setFilteredData,
        handleFilterClick,
        addInvoice,
        setAddInvoice,
        editInvoice,
        setEditInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
