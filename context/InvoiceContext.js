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
  const [addInvoice, setAddInvoice] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState();

  useEffect(() => {
    const localStoredIsDemo = localStorage.getItem("localIsDemo");
    if (localStoredIsDemo) {
      setIsDemo(JSON.parse(localStoredIsDemo));
      return;
    } else {
      setIsDemo(false);
      return;
    }

    if (localStoredIsDemo !== isDemo) {
      localStorage.setItem("localIsDemo", isDemo);
    }

    const localStoredIsLogin = localStorage.getItem("localIsLogin");
    if (localStoredIsLogin) {
      setIsDemo(JSON.parse(localStoredIsLogin));
      return;
    } else {
      setIsDemo(false);
      return;
    }

    if (localStoredIsLogin !== isLogin) {
      localStorage.setItem("localIsLogin", isLogin);
    }
  }, [isDemo, isLogin]);

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

  useEffect(() => {
    const fetchInvoices = async () => {
      if (isDemo) {
        const localStoredInvoices = localStorage.getItem("localInvoices");
        if (localStoredInvoices) {
          setFilteredData(JSON.parse(localStoredInvoices));
          return;
        } else {
          setFilteredData(exampleData);
          return;
        }
      }

      if (isLogin) {
        try {
          const response = await fetch(
            `https://api.invoice-app.naughty-cat.com/invoices/all`
          );

          if (response.status !== 200) throw new Error();

          const data = await response.json();

          setFilteredData(data);
        } catch (e) {
          setFilteredData([]);
        }
      }
    };

    fetchInvoices();
  }, [isDemo]);

  useEffect(() => {
    if (isDemo) {
      localStorage.setItem("localInvoices", JSON.stringify(filteredData));
    }
  }, [filteredData, isDemo]);

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
        isLogin,
        setIsLogin,
        userData,
        setUserData,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
