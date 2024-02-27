"use client";
import { useRouter } from "next/navigation";
import backArrowIcon from "../../../public/icon-arrow-left.svg";
import Image from "next/image";
import StatusButton from "@/components/StatusButton";
import { useState, useEffect } from "react";
import SummaryComponent from "@/components/SummaryComponent";
import { formatDate } from "@/utils";
import { useInvoiceContext } from "@/context/InvoiceContext";
import { Transition } from "@headlessui/react";
import InvoiceForm from "@/components/InvoiceForm";
import Head from "next/head";

const Invoice = ({ params }) => {
  const router = useRouter();
  const {
    filteredData,
    isAddInvoice,
    setIsAddInvoice,
    isEditInvoice,
    setIsEditInvoice,
    isDemo,
  } = useInvoiceContext();

  let invoice = filteredData?.filter((item) => item.id === params.id[0])[0];

  return (
    <main className="min-h-screen pt-[72px] relative px-6 mx-auto pb-[120px] md:pb-[50px] xl:max-w-[730px]">
      <Head>
        <title>Invoice #{params.id} | My Invoice App</title>
      </Head>
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey animation-effect"
        onClick={() => router.back()}
      >
        <Image
          src={backArrowIcon}
          width={7}
          height={10}
          alt=""
          className="w-[7px] h-auto object-contain object-center mr-6"
        />
        Go back
      </button>

      <section>
        <div className="box-shadow-invoiceCard md:flex md:justify-between md:items-center md:bg-white md:dark:bg-darkGrey md:rounded-[8px] md:py-5 md:px-8">
          <div className="bg-white dark:bg-darkGrey rounded-[8px] p-6 flex items-center justify-between md:rounded-none md:p-0 md:space-x-4">
            <p className="bodyText">Status</p>
            <StatusButton status={invoice?.status} />
          </div>

          <div className="bg-white dark:bg-darkGrey p-6 flex justify-between items-center absolute bottom-0 w-full left-0 right-0 md:relative md:justify-end md:p-0 md:space-x-2">
            <button
              className="bodyText font-bold py-3 px-6 bg-[#F9FAFE] dark:bg-grey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-white animation-effect"
              onClick={() => setIsEditInvoice(!isEditInvoice)}
            >
              Edit
            </button>
            <button className="bodyText font-bold py-3 px-6 bg-red rounded-full text-white hover:bg-lightRed animation-effect">
              Delete
            </button>
            <button className="bodyText font-bold py-3 px-6 bg-purple rounded-full text-white hover:bg-lightPurple animation-effect">
              Mark as Paid
            </button>
          </div>
        </div>

        {/* invoice details */}
        <div className="bg-white dark:bg-darkGrey rounded-[8px] mt-4 mb-10 p-6 box-shadow-invoiceCard md:mt-6 md:p-8">
          <div className="md:truncate">
            <div className="md:flex md:items-start md:justify-between">
              <div className="">
                <h2 className="headingText">
                  <span className="text-lightGrey">#</span>
                  {invoice?.id}
                </h2>
                {invoice?.invoiceItems?.map((obj, index) => (
                  <span key={index} className="bodyText mt-1">
                    {(index ? ", " : "") + obj.name}
                  </span>
                ))}
              </div>

              <div className="mt-[30px] bodyText md:mt-0 md:text-right">
                <p>{invoice?.billFromStreetAddress}</p>
                <p>{invoice?.billFromCity}</p>
                <p>{invoice?.billFromPostalCode}</p>
                <p>{invoice?.billFromCountry}</p>
              </div>
            </div>

            <div className="mt-[30px] bodyText md:flex md:space-x-[110px] md:mt-[21px]">
              <div className="flex space-x-10 items-start md:space-x-[98px]">
                <div className="space-y-8">
                  <div className="">
                    <p>Invoice Date</p>
                    <h3 className="mt-3 headingText">
                      {formatDate(invoice?.date)}
                    </h3>
                  </div>
                  <div className="">
                    <p>Payment Due</p>
                    <h3 className="mt-3 headingText">
                      {new Date(invoice?.amountDue).toLocaleDateString(
                        "en-us",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </h3>
                  </div>
                </div>

                <div>
                  <p>Bill To</p>
                  <h3 className="mt-3 headingText">{invoice?.billToName}</h3>
                  <div className="bodyText mt-2">
                    <p>{invoice?.billToStreetAddress}</p>
                    <p>{invoice?.billToCity}</p>
                    <p>{invoice?.billToPostalCode}</p>
                    <p>{invoice?.billToCountry}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <p>Sent to</p>
                <h3 className="mt-3 headingText">{invoice?.billToEmail}</h3>
              </div>
            </div>
          </div>

          {/* summary */}
          <SummaryComponent invoice={invoice} />
        </div>
      </section>

      <Transition show={isEditInvoice}>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
        >
          <InvoiceForm
            invoice={invoice}
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
            onClick={() => setIsEditInvoice(!isEditInvoice)}
          />
        </Transition.Child>
      </Transition>
    </main>
  );
};

export default Invoice;
