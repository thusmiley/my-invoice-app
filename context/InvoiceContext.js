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
      fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user`, {
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 404) {
            return [];
          } else if (response.ok) {
            return response.json();
          } else {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );  
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


    // auth - fetch user data
    useEffect(() => {
      if (isLoggedin) {
        fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user`, {
          credentials: "include",
        })
          .then((response) => {
            if (response.status === 404) {
              return [];
            } else if (response.status === 200) {
              return response.json();
            } else {
              throw new Error(
                `Unexpected server response with status code ${response.status}`
              );            }
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
      fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices/all`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if(response.status === 200){
            return response.json();
          }else if (response.status === 404) {
            return [];
          } else {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );  
          }
        })
        .then((response) => {
          setInvoices(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDemo, isLoggedin]);

  //Sets local invoices to display immediately if in demo mode, and waits for a succesful server response to set them while logged in
  const addInvoice = (newInvoice) => {
    if (isDemo) {
      setInvoices((prev) => [...prev, newInvoice]);
      return;
    }

    if (isLoggedin) {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      })
        //Handles the response depending on if the status code matches the expected success code or not
        .then((response) => {
          if (response.status === 201){
            return response.json()
          }
          if (response.status !== 201) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
          return response;
        })
        //On successful query, adds the new invoice returned by the server with its newly assigned UUID to local
        .then((response) => {
          setInvoices((prev) => [...prev, response]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Sets local invoices to display immediately if in demo mode, and waits for a succesful server response to set them while logged in
  const deleteInvoice = (invoice) => {
    if (isDemo) {
      setInvoices((prev) =>
        prev.filter((item) => item.invoiceNumber !== invoice.invoiceNumber)
      );
      return;
    }

    if (isLoggedin) {
      console.log("is loggedin!");
      fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices/${invoice?.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        //Handles the response depending on if the status code matches the expected success code or not
        .then((response) => {
          if (response.status === 200) {
            return
          } else if (response.status !== 200) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
        })
        //On successful query, removes the invoice from local
        .then(() => {
          setInvoices((prev) =>
            prev.filter(
              (item) => item.invoiceNumber !== invoice.invoiceNumber
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Sets local invoices to display immediately if in demo mode, and waits for a succesful server response to set them while logged in
  const editInvoice = (invoiceNumber, newInvoice) => {
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
      fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices/${newInvoice.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newInvoice),
        }
      )
        //Handles the response depending on if the status code matches the expected success code or not
        .then((response) => {
          if (response.status === 201) {
            return
          } else if (response.status !== 201) {
            throw new Error(
              `Unexpected server response with status code ${response.status}`
            );
          }
        })
        //On successful query, updates the invoice on local
        .then(() => {
          setInvoices((prev) =>
            prev.map((invoice) => {
              if (invoice.invoiceNumber === invoiceNumber) {
                return newInvoice;
              }
              return invoice;
            })
          );
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
