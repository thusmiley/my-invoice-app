"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import AddNewButton from "@/components/AddNewButton";
import InvoiceCard from "@/components/InvoiceCard";
import illustration from "../../public/illustration-empty.svg";
import { useInvoiceContext } from "@/context/InvoiceContext";
import InvoiceForm from "@/components/InvoiceForm";
import { Transition } from "@headlessui/react";
import Head from "next/head";
import exampleData from "../../utils/data.json";
import { emptyInvoice } from "@/utils";
import "dotenv/config";

export default function Home() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadMore, setLoadMore] = useState(10);
  const {
    invoices,
    setInvoices,
    isAddInvoice,
    setIsAddInvoice,
    isEditInvoice,
    setIsEditInvoice,
    isLoggedin,
    isDemo,
    isLoading,
    setIsLoading,
  } = useInvoiceContext();

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
      setIsLoading(true);

      fetch(`${process.env.BACK_END_URL}/invoices/all`, {
        credentials: "include",
      })
        .then(async (response) => {
          if (response.status === 404) {
            console.log("error invoices 404");
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
    }
  }, [isDemo, isLoggedin]);

  useEffect(() => {
    const stringInvoices = JSON.stringify(invoices);
    if (isDemo && stringInvoices) {
      localStorage.setItem("invoices", stringInvoices);
    }
  }, [invoices, isDemo]);

  useEffect(() => {
    console.log(invoices);
  }, [invoices]);

  const handleFilterClick = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleLoadMore = () => {
    setLoadMore(loadMore + 10);
  };

  //   console.log(typeof isDemo);
  //   console.log(typeof isLoggedin);

  return (
    <main className="min-h-screen z-0 pt-[72px] mb-[90px] px-6 mx-auto md:px-[48px] max-w-[830px]">
      <Head>
        <title>Dashboard | My Invoice App</title>
        <meta
          name="description"
          content="Made by Thu Smiley @Naughty Cat"
          key="desc"
        />
      </Head>
      <section className="flex items-center justify-between my-[34px] md:my-[56px]">
        <div>
          <h1 className="headingText">Invoices</h1>
          {invoices?.length === 0 ? (
            <p className="bodyText mt-1 md:mt-2">No invoices</p>
          ) : (
            <p className="bodyText mt-1 md:mt-2">
              <span className="hidden md:inline">There are&nbsp;</span>
              {filterStatus === "all"
                ? invoices?.length
                : invoices.filter((item) => item.status === filterStatus)
                    .length}
              {filterStatus === "all" && (
                <span className="hidden md:inline">&nbsp;total</span>
              )}
              {filterStatus === "draft" && (
                <span className="hidden md:inline">&nbsp;draft</span>
              )}
              {filterStatus === "pending" && (
                <span className="hidden md:inline">&nbsp;pending</span>
              )}
              {filterStatus === "paid" && (
                <span className="hidden md:inline">&nbsp;paid</span>
              )}
              &nbsp;invoice(s)
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Filter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleFilterClick={handleFilterClick}
          />
          <AddNewButton
            isAddInvoice={isAddInvoice}
            setIsAddInvoice={setIsAddInvoice}
          />
          <Transition show={isAddInvoice}>
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="-translate-x-full opacity-0"
            >
              <InvoiceForm invoice={emptyInvoice} />
            </Transition.Child>
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed w-full h-full top-[72px] bottom-0 left-0 right-0 z-10 bg-black/50 md:top-[80px] xl:top-0 xl:left-[103px]" />
            </Transition.Child>
          </Transition>
        </div>
      </section>

      {isLoading && (
        <h2 className="mt-10 headingText text-center md:mt-[64px]">
          Loading...
        </h2>
      )}
      {invoices?.length === 0 ? (
        <section className="max-w-[217px] mx-auto mt-[102px] text-center md:max-w-[242px] md:mt-[210px] xl:mt-[141px]">
          <Image
            src={illustration}
            width={242}
            height={200}
            alt=""
            className="w-full h-auto object-contain object-center"
            priority={true}
          />
          <h2 className="mt-10 headingText md:mt-[64px]">
            There is nothing here
          </h2>
          <p className="bodyText mt-6 max-w-[221px] mx-auto">
            Create an invoice by clicking the
            <span className="font-bold"> New</span> button and get started.
          </p>
        </section>
      ) : (
        <section className="relative text-center">
          <div className="space-y-4 text-left">
            {filterStatus === "all"
              ? invoices
                  ?.slice(0, loadMore)
                  .map((invoice) => (
                    <InvoiceCard key={invoice.invoiceNum} invoice={invoice} />
                  ))
              : invoices
                  .filter((item) => item.status === filterStatus)
                  .slice(0, loadMore)
                  .map((invoice) => (
                    <InvoiceCard key={invoice.invoiceNum} invoice={invoice} />
                  ))}
          </div>
          {invoices?.length > 10 && invoices?.length > loadMore && (
            <button
              type="button"
              className="bg-purple text-white mt-12 animation-effect rounded-full py-[6px] px-5 hover:bg-lightPurple"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </section>
      )}
    </main>
  );
}
