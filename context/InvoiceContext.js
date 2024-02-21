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
  const [addInvoice, setAddInvoice] = useState(true);

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
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
