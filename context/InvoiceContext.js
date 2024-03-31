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

  const fetchInvoices = () => {
    setIsLoading(true);

    fetch(`${process.env.BACK_END_URL}/invoices/all`, {
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 404) {
          console.log("Empty invoice array - error invoices 404");
          return [];
        } else if (response.ok) {
          return response.json();
        } else {
          let data = await response.json();
          throw new Error(`${response.status}: ${data.message}`);
        }
      })
      .then((response) => {
        setInvoices(response);
        setIsLoading(false);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
    if (isDemo) return;

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newInvoice),
      }).catch((err) => {
        console.log(err);
      });
      // fetchInvoices();
    }
  };

  const deleteInvoice = (invoice) => {
    setInvoices((prev) =>
      prev.filter((invoice) => invoice.invoiceNumber !== invoiceNumber)
    );
    if (isDemo) return;

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${invoice.id}`, {
        method: "DELETE",
        credentials: "include",
      }).catch((err) => {
        console.log(err);
      });
      //   fetchInvoices();
    }
  };

  const editInvoice = (invoiceNumber, newInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.invoiceNumber === invoiceNumber) {
          return newInvoice;
        }
        return invoice;
      })
    );
    if (isDemo) return;

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${invoiceNumber}`, {
        method: "PUT",
        credentials: "include",
      }).catch((err) => {
        console.log(err);
      });
      //   fetchInvoices();
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
        fetchInvoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
