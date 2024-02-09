"use client";
import Image from "next/image";
import arrowDownIcon from "../public/icon-arrow-down.svg";
import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

const Filter = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    if (!filterIsOpen) return;

    const closeDropdown = (e) => {
      if (!dropdown.current.contains(e.target)) {
        setFilterIsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeDropdown);

    return () => window.removeEventListener("mousedown", closeDropdown);
  }, [dropdown, filterIsOpen]);

  return (
    <div ref={dropdown} className="relative headingText leading-[15px] tracking-[-0.25px] ">
      <button
        className="flex items-center space-x-3"
        onClick={() => setFilterIsOpen(!filterIsOpen)}
      >
        Filter <span className="hidden md:inline">&nbsp;by status</span>
        <Image
          src={arrowDownIcon}
          height={7}
          width={11}
          alt=""
          className={`${
            filterIsOpen ? "[transform:rotateX(180deg)]" : ""
          } transform duration-200 ease-linear w-[11px] h-auto object-contain object-center`}
        />
      </button>
      {filterIsOpen && (
        <Transition
          show={filterIsOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <fieldset
            
            className="box-shadow-dropdown bg-white rounded-[8px] p-6 w-[192px] space-y-4 absolute right-0 top-6"
          >
            <div className="group flex items-center space-x-[13px]">
              <input
                type="radio"
                id="draft"
                name="filter"
                className="shrink-0 peer outline-none  appearance-none w-4 h-4 bg-lightestGrey rounded-[2px] border-[1px] border-lightestGrey hover:border-purple transition-all duration-200 ease-in-out checked:bg-purple checked:border-purple  cursor-pointer"
              />
              <svg
                width="10"
                height="8"
                className="absolute hidden  peer-checked:block outline-none pointer-events-none left-[14px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
              <label htmlFor="draft">Draft</label>
            </div>
            <div className="group flex items-center space-x-[13px]">
              <input
                type="radio"
                id="pending"
                name="filter"
                className="shrink-0 peer outline-none  appearance-none w-4 h-4 bg-lightestGrey rounded-[2px] border-[1px] border-lightestGrey hover:border-purple transition-all duration-200 ease-in-out checked:bg-purple checked:border-purple  cursor-pointer"
              />
              <svg
                width="10"
                height="8"
                className="absolute hidden  peer-checked:block outline-none pointer-events-none left-[14px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
              <label htmlFor="pending">Pending</label>
            </div>
            <div className="group flex items-center space-x-[13px]">
              <input
                type="radio"
                id="paid"
                name="filter"
                className="shrink-0 peer outline-none  appearance-none w-4 h-4 bg-lightestGrey rounded-[2px] border-[1px] border-lightestGrey hover:border-purple transition-all duration-200 ease-in-out checked:bg-purple checked:border-purple  cursor-pointer"
              />
              <svg
                width="10"
                height="8"
                className="absolute hidden  peer-checked:block outline-none pointer-events-none left-[14px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  strokeWidth="2"
                  fill="none"
                  clipRule="evenodd"
                />
              </svg>
              <label htmlFor="paid">Paid</label>
            </div>
          </fieldset>
        </Transition>
      )}
    </div>
  );
};

export default Filter;
