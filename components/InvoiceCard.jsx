"use client";
import { useRouter } from "next/navigation";
import StatusButton from "./StatusButton";
import Image from "next/image";
import arrowRightIcon from "../public/icon-arrow-right.svg";

const InvoiceCard = ({ invoice }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-[8px] p-6 cursor-pointer box-shadow-invoiceCard md:flex md:justify-between md:items-center md:py-4 border-[1px] border-white hover:border-purple transition-all duration-200 ease-in-out"
      onClick={() => router.push(`/invoice/${invoice.id}`)}
    >
      <div className="flex justify-between items-start md:justify-start md:space-x-7">
        <div className="md:flex md:items-center md:space-x-7">
          <h2 className="headingText leading-[15px] tracking-[-0.25px]">
            <span className="text-lightGrey">#</span>
            {invoice.id}
          </h2>
          <p className="bodyText mt-6 md:mt-0">Due {invoice.paymentDue}</p>
        </div>
        <h3 className="bodyText">{invoice.clientName}</h3>
      </div>

      <div className="flex justify-between items-end -mt-3 md:mt-0 md:items-center md:justify-end">
        <h4 className="headingText text-[16px] leading-[24px] tracking-[-0.8px] -mb-2 md:mb-0 md:mr-10">
          $
          {invoice.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h4>
        <StatusButton status={invoice.status} />
        <Image
          src={arrowRightIcon}
          width={7}
          height={10}
          alt="see details"
          className="hidden md:block w-[7px] h-auto object-contain object-center ml-5"
        />
      </div>
    </div>
  );
};

export default InvoiceCard;
