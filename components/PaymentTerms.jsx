"use client";
import Image from "next/image";
import downArrowIcon from "../public/icon-arrow-down.svg";
import { useEffect, useState, Fragment } from "react";
import { formatDate, formatCurrency, terms, data } from "@/utils";
import { Listbox } from "@headlessui/react";

const PaymentTerms = ({ selectedTerm, setSelectedTerm }) => {
  return (
    <Listbox value={selectedTerm} onChange={setSelectedTerm}>
      <Listbox.Button as="div">
        <div
          className="bodyText font-bold cursor-pointer py-4 px-6 form-input flex justify-between items-center"
        >
          {selectedTerm.name}
          <Image
            src={downArrowIcon}
            width={11}
            height={7}
            alt=""
            className="w-[11px] h-auto object-contain object-center"
          />
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute w-full top-[90px] bg-white dark:bg-grey z-[2] box-shadow-terms rounded-[8px] divide-y-[1px] divide-lightestGrey dark:divide-darkGrey outline-none">
        {terms.map((term) => (
          <Listbox.Option key={term.id} value={term} as={Fragment}>
            {({ active, selected }) => (
              <li
                value={term.name}
                className={`${active ? "text-purple dark:text-purple" : ""} ${
                  selected ? "text-purple dark:text-purple" : ""
                }  bodyText font-bold cursor-pointer py-4 px-6`}
              >
                {term.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default PaymentTerms;
