"use client";

import StatusButton from "@/components/StatusButton";
import { useState, useEffect } from "react";
import SummaryComponent from "@/components/SummaryComponent";
import { formatDate, findPaymentDueDate } from "@/utils";
import { useInvoiceContext } from "@/context/InvoiceContext";
import { Transition } from "@headlessui/react";
import InvoiceForm from "@/components/InvoiceForm";
import { useRouter } from "next/navigation";

const Invoice = ({ params }) => {
  const {
    invoices,
    isAddInvoice,
    setIsAddInvoice,
    isEditInvoice,
    setIsEditInvoice,
    isDemo,
    deleteInvoice,
    editInvoice,
    addInvoice,
  } = useInvoiceContext();

  const [invoice, setInvoice] = useState();
  const router = useRouter();

  const reRenderInvoice = () => {
    if (!params.id) return;
    const i = invoices?.filter(
      (item) => item.invoiceNumber === params.id[0]
    )[0];
    if (i) {
      setInvoice(i);
    }
  };

  useEffect(() => {
    reRenderInvoice();
  }, [params.id, invoices]);

  const [isDelete, setIsDelete] = useState(false);

  return (
    <main className="min-h-screen pt-[72px] relative px-6 mx-auto pb-[120px] md:pb-[50px] xl:max-w-[730px]">
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey animation-effect"
        onClick={() => router.back()}
      >
        <img
          src="/icon-arrow-left.svg"
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

          <div
            className={`${
              invoice?.status === "paid" ? "justify-end" : "justify-between"
            } bg-white dark:bg-darkGrey p-6 flex  items-center absolute bottom-0 w-full left-0 right-0 md:relative md:justify-end md:p-0 space-x-2`}
          >
            {invoice?.status !== "paid" && (
              <button
                className="bodyText font-bold h-12 px-6 bg-[#F9FAFE] dark:bg-grey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-white animation-effect"
                onClick={() => setIsEditInvoice(!isEditInvoice)}
              >
                Edit
              </button>
            )}
            <button
              className="bodyText font-bold h-12 px-6 bg-red rounded-full text-white hover:bg-lightRed animation-effect"
              onClick={() => setIsDelete(!isDelete)}
            >
              Delete
            </button>
            {invoice?.status === "pending" && (
              <button
                className={`bodyText font-bold py-3 px-6 bg-purple rounded-full text-white hover:bg-lightPurple animation-effect`}
                onClick={() => {
                  if (invoice) {
                    editInvoice(invoice.invoiceNumber, {
                      ...invoice,
                      status: "paid",
                    });
                    setInvoice({ ...invoice, status: "paid" });
                  }
                }}
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        {/* invoice details */}
        <div className="bg-white dark:bg-darkGrey rounded-[8px] mt-4 mb-10 p-6 box-shadow-invoiceCard md:mt-6 md:p-8">
          <div className="md:truncate">
            <div className="md:flex md:items-start md:justify-between">
              <div className="">
                <h2 className="headingText">
                  <span className="text-lightGrey">#</span>
                  {invoice?.invoiceNumber}
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
                      {formatDate(
                        findPaymentDueDate(invoice?.date, invoice?.paymentTerms)
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

      {/* edit invoice modal */}
      <Transition show={isEditInvoice}>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
        >
          <InvoiceForm invoice={invoice} />
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

      {/* confirm deletion popup */}
      <div
        className={`${
          isDelete ? "" : "hidden"
        } fixed w-full h-full top-0 bottom-0 left-0 right-0 z-20 bg-black/50`}
      />
      <div
        className={`${
          isDelete ? "" : "hidden"
        } z-20 fixed top-[50%] left-[50%] w-full  px-6 mx-auto -translate-x-[50%] -translate-y-[50%] max-w-[480px]`}
      >
        <div className="p-8 bg-white dark:bg-darkestGrey rounded-[8px] ">
          <h2 className="priceText">Confirm Deletion</h2>
          <p className="bodyText text-lightGrey dark:text-lightGrey mt-2 mb-6">
            Are you sure you want to delete invoice #{invoice?.invoiceNumber}?
            This action cannot be undone.
          </p>
          <div className="space-x-2 flex justify-end">
            <button
              type="button"
              className="bodyText font-bold py-3 px-6 bg-[#F9FAFE] dark:bg-grey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-white animation-effect"
              onClick={() => setIsDelete(!isDelete)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bodyText font-bold py-3 px-6 bg-red rounded-full text-white hover:bg-lightRed animation-effect"
              onClick={() => {
                deleteInvoice(invoice);
                router.replace("/dashboard");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Invoice;
