"use client";
import { createContext, useContext, useEffect, useState } from "react";
import exampleData from "../utils/data.json";
import "dotenv/config";

const InvoiceContext = createContext({
  invoices: [],
  deleteInvoice: (invoiceNum) => {},
  addInvoice: (newInvoice) => {},
  editInvoice: (invoiceNum, edited) => {},
  isDemo: false,
});

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddInvoice, setIsAddInvoice] = useState(false);
  const [isEditInvoice, setIsEditInvoice] = useState(false);
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

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchInvoices = async () => {
      localStorage.setItem("localIsDemo", isDemo);
      if (isDemo) {
        const localStoredInvoices = localStorage.getItem("localInvoices");
        if (localStoredInvoices) {
          setInvoices(JSON.parse(localStoredInvoices));
          return;
        } else {
          setInvoices(exampleData);
          return;
        }
      }

      localStorage.setItem("localIsLoggedin", isLoggedin);
      if (isLoggedin === true) {
        fetch(`${process.env.BACK_END_URL}/user`)
          .then((response) => response.json())
          .then((response) => {
            setUserData(response);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        fetch(`${process.env.BACK_END_URL}/invoices/all`)
          .then((response) => response.json())
          .then((response) => {
            setInvoices(response);
            console.lgo(response);
          })
          .catch((err) => console.log(err));
        setInvoices([]);
      }
    };
    fetchInvoices();
  }, [isDemo, isLoggedin]);

  useEffect(() => {
    const stringInvoices = JSON.stringify(invoices);
    if (isDemo === true && stringInvoices) {
      localStorage.setItem("localInvoices", stringInvoices);
    }
  }, [invoices, isDemo]);

  const handleFilterClick = (e) => {
    setFilterStatus(e.target.value);
  };

  const deleteInvoice = async (invoiceNum) => {
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

  const addInvoice = async (newInvoice) => {
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

  const editInvoice = async (invoiceNum, edited) => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.invoiceNum === invoiceNum) {
          return edited;
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
        filterStatus,
        setFilterStatus,
        invoices,
        setInvoices,
        handleFilterClick,
        isAddInvoice,
        setIsAddInvoice,
        isEditInvoice,
        setIsEditInvoice,
        isDemo,
        setIsDemo,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        editInvoice,
        addInvoice,
        deleteInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
