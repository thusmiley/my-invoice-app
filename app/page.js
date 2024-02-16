"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import AddNewButton from "@/components/AddNewButton";
import data from "../utils/data.json";
import InvoiceCard from "@/components/InvoiceCard";
import illustration from "../public/illustration-empty.svg";
import { useInvoiceContext } from "@/context/InvoiceContext";
import InvoiceForm from "@/components/InvoiceForm";

export default function Home() {
  const [loadMore, setLoadMore] = useState(5);
  const [addInvoice, setAddInvoice] = useState(true);
  const { status } = useInvoiceContext();

  const handleLoadMore = () => {
    setLoadMore(loadMore + 5);
  };

  return (
    <main className="min-h-screen z-0 pt-[72px] mb-[90px] px-6 mx-auto md:px-[48px] xl:max-w-[730px]">
      <section className="flex items-center justify-between my-[34px] md:my-[56px]">
        <div>
          <h1 className="headingText">Invoices</h1>
          {data?.length === 0 ? (
            <p className="bodyText mt-1 md:mt-2">No invoices</p>
          ) : (
            <p className="bodyText mt-1 md:mt-2">
              <span className="hidden md:inline">There are&nbsp;</span>
              {status === "all"
                ? data.length
                : data.filter((item) => item.status === status).length}
              {status === "all" && (
                <span className="hidden md:inline">&nbsp;total</span>
              )}
              {status === "draft" && (
                <span className="hidden md:inline">&nbsp;draft</span>
              )}
              {status === "pending" && (
                <span className="hidden md:inline">&nbsp;pending</span>
              )}
              {status === "paid" && (
                <span className="hidden md:inline">&nbsp;paid</span>
              )}
              &nbsp;invoices
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Filter />
          <AddNewButton addInvoice={addInvoice} setAddInvoice={setAddInvoice} />
          {addInvoice && (
            <InvoiceForm
              addInvoice={addInvoice}
              setAddInvoice={setAddInvoice}
            />
          )}
          {addInvoice && (
            <div
              className="fixed w-full h-full top-[72px] bottom-0 left-0 right-0 z-10 bg-black/50 md:top-[80px] xl:top-0 xl:left-[103px]"
              onClick={() => setAddInvoice(!addInvoice)}
            />
          )}
        </div>
      </section>

      {data.length === 0 ? (
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
            {data.slice(0, loadMore).map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
          {data.length > 5 && (
            <button
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
