"use client";
import { createContext, useContext, useEffect, useState } from "react";
import exampleData from "../utils/data.json";
import "dotenv/config";

const InvoiceContext = createContext();

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
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
  const [userData, setUserData] = useState();

  // dark mode
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // login/demo toggle
  useEffect(() => {
    localStorage.setItem("isDemo", JSON.stringify(isDemo));
    localStorage.setItem("isLoggedin", JSON.stringify(isLoggedin));
  }, [isDemo, isLoggedin]);

  // auth - fetch user data
  useEffect(() => {
    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/user`, { credentials: "include" })
        .then(async (response) => {
          if (response.status === 404) {
            console.log("error user data 404");
            return [];
          } else if (response.ok) {
            return response.json();
          } else {
            let data = await response.json();
            throw new Error(`${response.status}: ${data.message}`);
          }
        })
        .then((response) => {
          setUserData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // fetch invoices from server
  useEffect(() => {
    if (isDemo) {
      const localStoredInvoices = localStorage.getItem("invoices");
      if (localStoredInvoices) {
        setInvoices(JSON.parse(localStoredInvoices));
      } else {
        setInvoices(exampleData);
      }
    }

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/all`, {
        method: "GET",
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
          //   console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDemo, isLoggedin]);

  // add invoice
  const addInvoice = (newInvoice) => {
    if (isDemo) {
      setInvoices((prev) => [...prev, newInvoice]);
      return;
    }
    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setInvoices((prev) => [...prev, response]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // delete invoice
  const deleteInvoice = (invoice) => {
    if (isDemo) {
      console.log("is demo!");
      setInvoices((prev) =>
        prev.filter((item) => item.invoiceNumber !== invoice.invoiceNumber)
      );
      return;
    }
    if (isLoggedin) {
      console.log("is loggedin!");
      fetch(`${process.env.BACK_END_URL}/invoices/${invoice?.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setInvoices((prev) =>
              prev.filter(
                (item) => item.invoiceNumber !== invoice.invoiceNumber
              )
            );
            return response;
          } else if (response.status !== 200) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // edit invoice
  const editInvoice = async (invoiceNumber, newInvoice) => {
    if (isDemo) {
      setInvoices((prev) =>
        prev.map((invoice) => {
          if (invoice.invoiceNumber === invoiceNumber) {
            return newInvoice;
          }
          return invoice;
        })
      );
      return;
    }

    if (isLoggedin) {
      fetch(`${process.env.BACK_END_URL}/invoices/${newInvoice.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      })
        .then((response) => {
          if (response.status === 201) {
            setInvoices((prev) =>
              prev.map((invoice) => {
                if (invoice.invoiceNumber === invoiceNumber) {
                  return newInvoice;
                }
                return invoice;
              })
            );
          } else if (response.status !== 201) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
        })
        .catch((err) => {
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
        darkMode,
        setDarkMode,
        toggleTheme,
        userData,
        setUserData,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
