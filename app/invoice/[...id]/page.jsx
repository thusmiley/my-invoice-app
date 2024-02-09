"use client";
import { useRouter } from "next/navigation";
import backArrowIcon from "../../../public/icon-arrow-left.svg";
import Image from "next/image";
import StatusButton from "@/components/StatusButton";
import data from "../../../utils/data.json";
import { useState, useEffect } from "react";
import SummaryComponent from "@/components/SummaryComponent";

const Invoice = ({ params }) => {
  const router = useRouter();
  const [invoice, setInvoice] = useState();

  useEffect(() => {
    setInvoice(
      data.filter(
        (item) =>
          item.id.toString().toLowerCase() ===
          params.id.toString().toLowerCase()
      )[0]
    );
  }, []);

  return (
    <main className="min-h-screen relative px-6 mx-auto pb-[120px] md:pb-[50px] xl:max-w-[730px]">
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey duration-200 ease-in-out"
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
        <div className="box-shadow-invoiceCard md:flex md:justify-between md:items-center md:bg-white md:rounded-[8px] md:py-5 md:px-8">
          <div className="bg-white rounded-[8px] p-6 flex items-center justify-between md:rounded-none md:p-0 md:space-x-4">
            <p className="bodyText">Status</p>
            <StatusButton status={invoice?.status} />
          </div>

          <div className="bg-white p-6 flex justify-between items-center absolute bottom-0 w-full left-0 right-0 md:relative md:justify-end md:p-0 md:space-x-2">
            <button className="bodyText py-3 px-6 bg-[#F9FAFE] rounded-full hover:bg-lightestGrey duration-200 ease-in-out">
              Edit
            </button>
            <button className="bodyText py-3 px-6 bg-red rounded-full text-white hover:bg-lightRed duration-200 ease-in-out">
              Delete
            </button>
            <button className="bodyText py-3 px-6 bg-purple rounded-full text-white hover:bg-lightPurple duration-200 ease-in-out">
              Mark as Paid
            </button>
          </div>
        </div>

        {/* invoice details */}
        <div className="bg-white rounded-[8px] mt-4 mb-10 p-6 box-shadow-invoiceCard md:mt-6 md:p-8">
          <div className="md:truncate">
            <div className="md:flex md:items-start md:justify-between">
              <div className="">
                <h2 className="headingText md:text-[16px] md:leading-[24px] md:tracking-[-.8px]">
                  <span className="text-lightGrey">#</span>
                  {invoice?.id}
                </h2>
                {invoice?.items.map((obj, index) => (
                  <span key={index} className="bodyText mt-1">
                    {(index ? ", " : "") + obj.name}
                  </span>
                ))}
              </div>

              <div className="mt-[30px] bodyText text-[11px] tracking-[-.23px] leading-[18px] md:mt-0">
                <p>{invoice?.senderAddress.street}</p>
                <p>{invoice?.senderAddress.city}</p>
                <p>{invoice?.senderAddress.postCode}</p>
                <p>{invoice?.senderAddress.country}</p>
              </div>
            </div>

            <div className="mt-[30px] bodyText text-[11px] tracking-[-.23px] leading-[18px] md:flex md:space-x-[110px] md:mt-[21px]">
              <div className="flex space-x-10 items-start md:space-x-[98px]">
                <div className="space-y-8">
                  <div className="">
                    <p>Invoice Date</p>
                    <h3 className="mt-3 text-[15px] leading-[20px] tracking-[-.31px] headingText">
                      {new Date(invoice?.createdAt).toLocaleDateString(
                        "en-us",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </h3>
                  </div>
                  <div className="">
                    <p>Payment Due</p>
                    <h3 className="mt-3 text-[15px] leading-[20px] tracking-[-.31px] headingText">
                      {new Date(invoice?.paymentDue).toLocaleDateString(
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
                  <h3 className="mt-3 text-[15px] leading-[20px] tracking-[-.31px] headingText">
                    {invoice?.clientName}
                  </h3>
                  <div className="text-[11px] tracking-[-.23px] leading-[18px] mt-2">
                    <p>{invoice?.clientAddress.street}</p>
                    <p>{invoice?.clientAddress.city}</p>
                    <p>{invoice?.clientAddress.postCode}</p>
                    <p>{invoice?.clientAddress.country}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <p className="text-lightGrey">Sent to</p>
                <h3 className="mt-3 text-[15px] leading-[20px] tracking-[-.31px] headingText">
                  {invoice?.clientEmail}
                </h3>
              </div>
            </div>
          </div>

          {/* summary */}
          <SummaryComponent invoice={invoice} />
        </div>
      </section>
    </main>
  );
};

export default Invoice;
