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

export default function Home() {
  const [loadMore, setLoadMore] = useState(10);
  const {
    filteredData,
    filterStatus,
    isAddInvoice,
    setIsAddInvoice,
    isEditInvoice,
    setIsEditInvoice,
  } = useInvoiceContext();

  const handleLoadMore = () => {
    setLoadMore(loadMore + 10);
  };

  return (
    <main className="min-h-screen z-0 pt-[72px] mb-[90px] px-6 mx-auto md:px-[48px] xl:max-w-[730px]">
      <Head>
        <title>Dashboard | My Invoice App</title>
      </Head>
      <section className="flex items-center justify-between my-[34px] md:my-[56px]">
        <div>
          <h1 className="headingText">Invoices</h1>
          {filteredData?.length === 0 ? (
            <p className="bodyText mt-1 md:mt-2">No invoices</p>
          ) : (
            <p className="bodyText mt-1 md:mt-2">
              <span className="hidden md:inline">There are&nbsp;</span>
              {filterStatus === "all"
                ? filteredData?.length
                : filteredData.filter((item) => item.status === filterStatus)
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
              &nbsp;invoices
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Filter />
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
              <InvoiceForm
                invoice={null}
                isAddInvoice={isAddInvoice}
                setIsAddInvoice={setIsAddInvoice}
                isEditInvoice={isEditInvoice}
                setIsEditInvoice={setIsEditInvoice}
              />
            </Transition.Child>
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed w-full h-full top-[72px] bottom-0 left-0 right-0 z-10 bg-black/50 md:top-[80px] xl:top-0 xl:left-[103px]"
                onClick={() => setIsAddInvoice(!isAddInvoice)}
              />
            </Transition.Child>
          </Transition>
        </div>
      </section>

      {filteredData?.length === 0 ? (
        <section className="max-w-[217px] mx-auto mt-[102px] text-center md:max-w-[242px] md:mt-[210px] xl:mt-[141px]">
          <Image
            src={illustration}
            width={242}
            height={200}
            alt=""
            className="w-full h-auto object-contain object-center"
          />
          <h2 className="mt-10 headingText md:mt-[64px]">
            There is nothing here
          </h2>
          <p className="bodyText mt-6 max-w-[221px] mx-auto">
            Create an invoice by clicking the{" "}
            <span className="font-bold">New</span> button and get started.
          </p>
        </section>
      ) : (
        <section className="relative text-center">
          <div className="space-y-4 text-left">
            {filterStatus === "all"
              ? filteredData
                  ?.slice(0, loadMore)
                  .map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                  ))
              : filteredData
                  .filter((item) => item.status === filterStatus)
                  .slice(0, loadMore)
                  .map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                  ))}
          </div>
          {filteredData?.length > 10 && (
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
