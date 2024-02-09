import Image from "next/image";
import Filter from "@/components/Filter";
import AddNewButton from "@/components/AddNewButton";
import data from "../utils/data.json";
import InvoiceCard from "@/components/InvoiceCard";
import illustration from "../public/illustration-empty.svg";

export default function Home() {
  return (
    <main className="min-h-screen mb-[90px] px-6 mx-auto md:px-[48px] xl:max-w-[730px]">
      <section className="flex items-center justify-between my-[34px] md:my-[56px]">
        <div>
          <h1 className="headingText">
            Invoices
          </h1>
          {data?.length === 0 ? (
            <p className="bodyText mt-1 md:mt-2">No invoices</p>
          ) : (
            <p className="bodyText mt-1 md:mt-2">
              <span className="hidden md:inline">There are&nbsp;</span>
              {data.length}
              <span className="hidden md:inline">&nbsp;total</span>
              &nbsp;invoices
            </p>
          )}
        </div>
        <div className="flex items-center space-x-[18px] md:space-x-10">
          <Filter />
          <AddNewButton />
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
        <section className="space-y-4">
          {data.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </section>
      )}
    </main>
  );
}
