"use client";
import { useRouter } from "next/navigation";
import StatusButton from "./StatusButton";
import { formatCurrency, formatDate, findPaymentDueDate } from "@/utils";

const InvoiceCard = ({ invoice }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white dark:bg-darkGrey rounded-[8px] relative z-0 p-6 cursor-pointer box-shadow-invoiceCard md:flex md:justify-between md:items-center md:py-4 border-[1px] border-white dark:border-darkGrey hover:border-purple dark:hover:border-purple animation-effect"
      onClick={() => router.push(`/invoice/${invoice.invoiceNumber}`)}
    >
      <div className="flex justify-between items-start md:justify-start md:space-x-7">
        <div className="md:flex md:items-center md:space-x-7">
          <h2 className="headingText">
            <span className="text-lightGrey">#</span>
            {invoice.invoiceNumber}
          </h2>
          <p className="bodyText mt-8 md:mt-0">
            Due&nbsp;
            {formatDate(findPaymentDueDate(invoice.date, invoice.paymentTerms))}
          </p>
        </div>
        <h3 className="bodyText truncate max-w-[120px]">
          {invoice.billToName}
        </h3>
      </div>

      <div className="flex justify-between items-end -mt-4 md:mt-0 md:items-center md:justify-end">
        <h4 className="priceText truncate -mb-2 md:mb-0 md:mr-10">
          ${formatCurrency(invoice.amountDue)}
        </h4>
        <StatusButton status={invoice.status} />
        <img
          src="/icon-arrow-right.svg"
          alt="see details"
          className="hidden md:block w-[7px] h-auto object-contain object-center ml-5"
        />
      </div>
    </div>
  );
};

export default InvoiceCard;
