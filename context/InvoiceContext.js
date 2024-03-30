"use client";
import { createContext, useContext, useEffect, useState } from "react";
import exampleData from "../utils/data.json";
import "dotenv/config";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [isDemo, setIsDemo] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("isDemo")
      ? JSON.parse(window.localStorage.getItem("isDemo"))
      : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("isLoggedin")
      ? JSON.parse(window.localStorage.getItem("isLoggedin"))
      : false
  );
  const [invoices, setInvoices] = useState();
  const [isAddInvoice, setIsAddInvoice] = useState(false);
  const [isEditInvoice, setIsEditInvoice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isDemo", JSON.stringify(isDemo));
    localStorage.setItem("isLoggedin", JSON.stringify(isLoggedin));
  }, [isDemo, isLoggedin]);

  const deleteInvoice = (invoiceNum) => {
    setInvoices((prev) =>
      prev.filter((invoice) => invoice.invoiceNum !== invoiceNum)
    );
    if (isDemo) return;

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${invoiceNum}`, {
        method: "DELETE",
        credentials: "include",
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
    if (isDemo) return;

      if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${newInvoice.invoiceNum}`, {
        method: "POST",
        credentials: "include",
      }).catch((err) => {
        console.log(err);
      });
      }
  };

  const editInvoice = (invoiceNum, newInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.invoiceNum === invoiceNum) {
          return newInvoice;
        }
        return invoice;
      })
    );
    if (isDemo) return;

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${invoiceNum}`, {
        method: "PUT",
        credentials: "include",
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        isAddInvoice,
        setIsAddInvoice,
        isEditInvoice,
        setIsEditInvoice,
        isDemo,
        setIsDemo,
        isLoggedin,
        setIsLoggedin,
        editInvoice,
        addInvoice,
        deleteInvoice,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
