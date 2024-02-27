"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import exampleData from "../utils/data.json";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [filteredData, setFilteredData] = useState();
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddInvoice, setIsAddInvoice] = useState(false);
  const [isEditInvoice, setIsEditInvoice] = useState(false);
  const [isDemo, setIsDemo] = useState(
    localStorage.getItem("localIsDemo")
      ? localStorage.getItem("localIsDemo")
      : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("localIsLoggedin")
      ? localStorage.getItem("localIsLoggedin")
      : false
  );

  const [userData, setUserData] = useState();

  useEffect(() => {
    localStorage.setItem("localIsDemo", isDemo);
    if (isDemo) {
      const localStoredInvoices = localStorage.getItem("localInvoices");
      if (localStoredInvoices) {
        setFilteredData(JSON.parse(localStoredInvoices));
      } else {
        setFilteredData(exampleData);
      }
    }

    localStorage.setItem("localIsLoggedin", isLoggedin);
    if (isLoggedin === true) {
      fetch(`https://api.invoice-app.naughty-cat.com/user`)
        .then((response) => response.json())
        .then((response) => {
          setUserData(response);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      fetch(`https://api.invoice-app.naughty-cat.com/invoices/all`)
        .then((response) => response.json())
        .then((response) => {
          setFilteredData(response);
        })
        .catch((err) => console.error(err));
    }
  }, [isDemo, isLoggedin]);

  useEffect(() => {
    const checkInvoices = JSON.stringify(filteredData);
    if (isDemo && checkInvoices) {
      localStorage.setItem("localInvoices", checkInvoices);
    }
  }, [filteredData, isDemo]);

  const handleLogin = () => {
    fetch(`https://api.invoice-app.naughty-cat.com/authentication/github`)
      .then((response) => response.json())
      .then((response) => {
        setIsLoggedin(true);
        setIsDemo(false);
      })
      .catch((err) => console.error(err));
  };

  const handleSignout = () => {
    fetch(`https://api.invoice-app.naughty-cat.com/authentication/logout`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        setIsLoggedin(false);
      })
      .catch((err) => console.error(err));
  };

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
        isAddInvoice,
        setIsAddInvoice,
        isEditInvoice,
        setIsEditInvoice,
        isDemo,
        setIsDemo,
        isLoggedin,
        setIsLoggedin,
        handleSignout,
        handleLogin,
        userData,
        setUserData,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
