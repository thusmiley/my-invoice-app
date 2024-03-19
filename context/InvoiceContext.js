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
    typeof window !== "undefined" && window.localStorage.getItem("localIsDemo")
      ? JSON.parse(window.localStorage.getItem("localIsDemo"))
      : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("localIsLoggedin")
      ? JSON.parse(window.localStorage.getItem("localIsLoggedin"))
      : false
  );
  const [invoices, setInvoices] = useState();
  const [isAddInvoice, setIsAddInvoice] = useState(false);
  const [isEditInvoice, setIsEditInvoice] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    localStorage.setItem("localIsDemo", JSON.stringify(isDemo));
    localStorage.setItem("localIsLoggedin", JSON.stringify(isLoggedin));
  }, [isDemo, isLoggedin]);

  //   useEffect(() => {
  //     const handleLogIn = () => {
  //       if (isDemo) {
  //         const localStoredInvoices = localStorage.getItem("localInvoices");
  //         if (localStoredInvoices) {
  //           setInvoices(JSON.parse(localStoredInvoices));
  //         } else {
  //           setInvoices(exampleData);
  //         }
  //       }

  //       if (isLoggedin) {
  //         fetch(`${process.env.BACK_END_URL}/user`, { credentials: "include" })
  //           .then((response) => {
  //             if (response.status === 404) {
  //               console.log("error user data 404");
  //             }
  //             return response.json();
  //           })
  //           .then((response) => {
  //             console.log(response);
  //             setUserData(response);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });

  //         fetch(`${process.env.BACK_END_URL}/invoices/all`, {
  //           credentials: "include",
  //         })
  //           .then((response) => {
  //             if (response.status === 404) {
  //               console.log("error invoices 404");
  //               setInvoices([]);
  //             } else {
  //               setInvoices(response);
  //             }
  //             return response.json();
  //           })
  //           .then((response) => {
  //             console.log(invoices);
  //             console.log(response);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     };
  //     handleLogIn();
  //   }, [isDemo, isLoggedin]);

  //   useEffect(() => {
  //     const stringInvoices = JSON.stringify(invoices);
  //     if (isDemo && stringInvoices) {
  //       localStorage.setItem("localInvoices", stringInvoices);
  //     }
  //   }, [invoices, isDemo]);

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
        userData,
        setUserData,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
