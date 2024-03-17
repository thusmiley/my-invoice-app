"use client";
import { createContext, useContext, useEffect, useState } from "react";
import exampleData from "../utils/data.json";
// import "dotenv/config";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [isDemo, setIsDemo] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("localIsDemo")
      ? window.localStorage.getItem("localIsDemo")
      : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("localIsLoggedin")
      ? window.localStorage.getItem("localIsLoggedin")
      : false
  );
  const [invoices, setInvoices] = useState();
  const [isAddInvoice, setIsAddInvoice] = useState(false);
  const [isEditInvoice, setIsEditInvoice] = useState(false);

  useEffect(() => {
    localStorage.setItem("localIsDemo", isDemo);
    localStorage.setItem("localIsLoggedin", isLoggedin);
    if (isDemo) {
      const localStoredInvoices = localStorage.getItem("localInvoices");
      if (localStoredInvoices) {
        setInvoices(JSON.parse(localStoredInvoices));
      } else {
        return setInvoices(exampleData);
      }
    } else {
      return setInvoices([]);
    }
  }, [isDemo, isLoggedin]);

  useEffect(() => {
    const stringInvoices = JSON.stringify(invoices);
    if (isDemo && stringInvoices) {
      localStorage.setItem("localInvoices", stringInvoices);
    }
  }, [invoices, isDemo]);

  const deleteInvoice = (invoiceNum) => {
    setInvoices((prev) =>
      prev.filter((invoice) => invoice.invoiceNum !== invoiceNum)
    );
    if (isDemo) return;

    // try {
    //   await fetch("/api/invoices/delete", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       id,
    //     }),
    //   });
    // } catch (err) {
    //   console.log(err);

    // }
  };

  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
    if (isDemo) return;

    //    try {
    //      await fetch("/api/invoices/add", {
    //        method: "POST",
    //        body: JSON.stringify({
    //          invoice: newInvoice,
    //        }),
    //      });
    //    } catch (err) {
    //      console.log(err);
    //    }
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

    // try {
    //   await fetch("/api/invoices/update", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       invoice: edited,
    //     }),
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
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
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
