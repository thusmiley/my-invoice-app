import Image from "next/image";
import plusIcon from "../public/icon-plus.svg";
import arrowDownIcon from "../public/icon-arrow-down.svg";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <main className="min-h-screen mb-[105px] px-6 mx-auto">
      <section className="flex items-center justify-between my-[34px]">
        <div>
          <h1 className="headingText text-[20px] tracking-[-.63px]">
            Invoices
          </h1>
          <p className="bodyText mt-1">7 invoices</p>
        </div>
        <div className="flex items-center space-x-[18px]">
          {/* filter */}
          <Filter />
          {/* add new  */}
          <button className="bg-purple text-white bodyText flex items-center p-[6px] rounded-full">
            <span className="bg-white rounded-full w-8 h-8 grid place-content-center">
              <Image
                src={plusIcon}
                height={10}
                width={10}
                alt=""
                className="w-[10px] h-auto object-contain object-center"
              />
            </span>
            <span className="mx-2">New</span>
            <span className="hidden md:inline"> Invoice</span>
          </button>
        </div>
      </section>
    </main>
  );
}
