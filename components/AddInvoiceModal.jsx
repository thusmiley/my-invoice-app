"use client";
import Image from "next/image";
import backArrowIcon from "../public/icon-arrow-left.svg";
import downArrowIcon from "../public/icon-arrow-down.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState, Fragment } from "react";
import { formatDate, formatCurrency } from "@/utils";
import { data } from "autoprefixer";
import { Listbox } from "@headlessui/react";
import ItemListComponent from "./ItemListComponent";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

const terms = [
  { id: 1, name: "Net 1 Day" },
  { id: 2, name: "Net 7 Days" },
  { id: 3, name: "Net 14 Days" },
  { id: 4, name: "Net 30 Days" },
];

let localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs().format("ll");

const AddInvoiceModal = ({ addInvoice, setAddInvoice }) => {
  const [value, setValue] = useState(dayjs(new Date()).format("ll"));

  const [itemNum, setItemNum] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState(terms[3]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    criteriaMode: "firstError",
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleItemRows = (itemNum) => {
    const rows = [];
    for (let i = 0; i < itemNum; i++) {
      rows.push(<ItemListComponent key={i} />);
    }
    return rows;
  };

  return (
    <div className="fixed h-screen overflow-y-scroll no-scrollbar z-50 w-full top-[72px] left-0 right-0 bottom-0 px-6 mx-auto pb-[72px] bg-white dark:bg-darkestGrey md:w-[80%] md:top-[80px] md:left-0 md:ml-0 md:rounded-r-[20px] md:pb-[80px] max-w-[719px] xl:top-0 xl:left-[103px] xl:pb-0">
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey animation-effect md:hidden"
        onClick={() => setAddInvoice(false)}
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
      <form
        className="relative md:mt-[56px] md:px-[56px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="priceText text-[28px]">New Invoice</h1>
        {/* bill from  */}
        <div className="space-y-6">
          <h2 className="form-heading">Bill From</h2>
          <div className="form-control">
            <label
              htmlFor="senderStreet"
              className={`${
                errors.senderStreet ? "text-red" : ""
              } bodyText mb-[10px]`}
            >
              Street Address
            </label>
            <input
              type="text"
              name="senderStreet"
              id="senderStreet"
              {...register("senderStreet", {
                required: "can't be empty",
              })}
              className={`${
                errors.senderStreet ? "border-red" : ""
              } form-input`}
            />
            {errors.senderStreet && (
              <p className="errorMsg">{errors.senderStreet.message}</p>
            )}
          </div>
          <div className="space-y-6 md:flex md:space-y-0 md:w-full md:space-x-6">
            <div className="flex space-x-6 justify-between md:w-[60%] md:space-x-0">
              <div className="form-control w-1/2 md:w-[46%] md:mr-6">
                <label
                  htmlFor="senderCity"
                  className={`${
                    errors.senderCity ? "text-red" : ""
                  } bodyText mb-[10px]`}
                >
                  City
                </label>
                <input
                  type="text"
                  name="senderCity"
                  id="senderCity"
                  {...register("senderCity", {
                    required: "can't be empty",
                    pattern: {
                      value:
                        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
                      message: "Invalid city",
                    },
                  })}
                  className={`${
                    errors.senderCity ? "border-red" : ""
                  } form-input`}
                />
                {errors.senderCity && (
                  <p className="errorMsg">{errors.senderCity.message}</p>
                )}
              </div>
              <div className="form-control w-1/2 md:w-[46%]">
                <label
                  htmlFor="senderZipCode"
                  className={`${
                    errors.senderZipCode ? "text-red" : ""
                  } bodyText mb-[10px]`}
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  name="senderZipCode"
                  id="senderZipCode"
                  {...register("senderZipCode", {
                    required: "can't be empty",
                    pattern: {
                      value: /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/,
                      message: "Invalid zipcode",
                    },
                  })}
                  className={`${
                    errors.senderZipCode ? "border-red" : ""
                  } form-input`}
                />
                {errors.senderZipCode && (
                  <p className="errorMsg">{errors.senderZipCode.message}</p>
                )}
              </div>
            </div>
            <div className="form-control md:w-[35.5%]">
              <label
                htmlFor="senderCountry"
                className={`${
                  errors.senderCountry ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Country
              </label>
              <input
                type="text"
                name="senderCountry"
                id="senderCountry"
                {...register("senderCountry", {
                  required: "can't be empty",
                  pattern: {
                    value: /[a-zA-Z]{2,}/,
                    message: "Invalid country",
                  },
                })}
                className={`${
                  errors.senderCountry ? "border-red" : ""
                } form-input`}
              />
              {errors.senderCountry && (
                <p className="errorMsg">{errors.senderCountry.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* bill to  */}
        <div className="space-y-6 pt-4">
          <h2 className="form-heading">Bill To</h2>
          <div className="form-control">
            <label
              htmlFor="name"
              className={`${errors.name ? "text-red" : ""} bodyText mb-[10px]`}
            >
              Client's Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", {
                required: "can't be empty",
              })}
              className={`${errors.name ? "border-red" : ""} form-input`}
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          </div>
          <div className="form-control">
            <label
              htmlFor="email"
              className={`${errors.email ? "text-red" : ""} bodyText mb-[10px]`}
            >
              Client's Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g. email@example.com"
              {...register("email", {
                required: "can't be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`${errors.email ? "border-red" : ""} form-input`}
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <label
              htmlFor="clientStreet"
              className={`${
                errors.clientStreet ? "text-red" : ""
              } bodyText mb-[10px]`}
            >
              Street Address
            </label>
            <input
              type="text"
              name="clientStreet"
              id="clientStreet"
              {...register("clientStreet", {
                required: "can't be empty",
              })}
              className={`${
                errors.clientStreet ? "border-red" : ""
              } form-input`}
            />
            {errors.clientStreet && (
              <p className="errorMsg">{errors.clientStreet.message}</p>
            )}
          </div>
          <div className="space-y-6 md:flex md:space-y-0 md:w-full md:space-x-6">
            <div className="flex space-x-6 justify-between md:w-[60%] md:space-x-0">
              <div className="form-control w-1/2 md:w-[46%] md:mr-6">
                <label
                  htmlFor="clientCity"
                  className={`${
                    errors.clientCity ? "text-red" : ""
                  } bodyText mb-[10px]`}
                >
                  City
                </label>
                <input
                  type="text"
                  name="clientCity"
                  id="clientCity"
                  {...register("clientCity", {
                    required: "can't be empty",
                    pattern: {
                      value:
                        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
                      message: "Invalid city",
                    },
                  })}
                  className={`${
                    errors.clientCity ? "border-red" : ""
                  } form-input`}
                />
                {errors.clientCity && (
                  <p className="errorMsg">{errors.clientCity.message}</p>
                )}
              </div>
              <div className="form-control w-1/2 md:w-[46%] md:mr-6">
                <label
                  htmlFor="clientZipCode"
                  className={`${
                    errors.clientZipCode ? "text-red" : ""
                  } bodyText mb-[10px]`}
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  name="clientZipCode"
                  id="clientZipCode"
                  {...register("clientZipCode", {
                    required: "can't be empty",
                    pattern: {
                      value: /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/,
                      message: "Invalid zipcode",
                    },
                  })}
                  className={`${
                    errors.clientZipCode ? "border-red" : ""
                  } form-input`}
                />
                {errors.clientZipCode && (
                  <p className="errorMsg">{errors.clientZipCode.message}</p>
                )}
              </div>
            </div>
            <div className="form-control md:w-[35.5%]">
              <label
                htmlFor="clientCountry"
                className={`${
                  errors.clientCountry ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Country
              </label>
              <input
                type="text"
                name="clientCountry"
                id="clientCountry"
                {...register("clientCountry", {
                  required: "can't be empty",
                  pattern: {
                    value: /[a-zA-Z]{2,}/,
                    message: "Invalid country",
                  },
                })}
                className={`${
                  errors.clientCountry ? "border-red" : ""
                } form-input`}
              />
              {errors.clientCountry && (
                <p className="errorMsg">{errors.clientCountry.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* invoice  */}
        <div className="space-y-6 pt-8">
          <div className="space-y-6 md:flex md:space-y-0 md:space-x-6">
            <div className="form-control md:w-1/2">
              <label
                htmlFor="date"
                className={`${
                  errors.date ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Invoice Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  {/* <DatePicker
                    label="Uncontrolled picker"
                    defaultValue={dayjs("2022-04-17")}
                  /> */}
                  <DatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="form-control basis-1/2 relative md:w-1/2">
              <span
                className={`${
                  errors.senderStreet ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Payment Terms
              </span>
              <Listbox value={selectedTerm} onChange={setSelectedTerm}>
                <Listbox.Button as="div">
                  <div
                    type="text"
                    name="terms"
                    id="terms"
                    {...register("terms", {
                      required: "can't be empty",
                    })}
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
                          value={date}
                          className={`${
                            active ? "text-purple dark:text-purple" : ""
                          } ${
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
            </div>
          </div>
          <div className="form-control basis-1/2">
            <label
              htmlFor="projectDescription"
              className={`${
                errors.projectDescription ? "text-red" : ""
              } bodyText mb-[10px]`}
            >
              Project Description
            </label>
            <input
              type="text"
              name="projectDescription"
              id="projectDescription"
              placeholder="e.g. Graphic Design Service"
              {...register("projectDescription", {
                required: "can't be empty",
              })}
              className={`${
                errors.projectDescription ? "border-red" : ""
              } form-input`}
            />
            {errors.projectDescription && (
              <p className="errorMsg">{errors.projectDescription.message}</p>
            )}
          </div>
        </div>

        {/* item list  */}
        <div className="space-y-6 pt-[66px]">
          <h2 className="text-[24px] leading-[32px] tracking-[-.38px] text-[#777F98] font-bold">
            Item List
          </h2>
          {handleItemRows(itemNum)}
          <button
            className="bg-[#F9FAFE] dark:bg-darkGrey rounded-[24px] py-4 w-full bodyText text-blueGrey hover:text-blueGrey dark:text-lightGrey font-bold hover:bg-lightestGrey dark:hover:text-white animation-effect dark:hover:bg-grey"
            onClick={() => setItemNum(itemNum + 1)}
          >
            + Add New Item
          </button>
        </div>

        <div className="mt-6 w-full flex flex-col h-[155px] md:h-[112px]">
          <div className="h-[64px] -mx-6 linear-bg overflow-hidden md:hidden"></div>
          <div className="bg-white -mx-6 overflow-hidden dark:bg-darkGrey p-6 flex justify-between dark:md:bg-darkestGrey md:py-8">
            <button className="bodyText font-bold py-3 px-6 bg-[#F9FAFE] dark:bg-[#F9FAFE] dark:text-blueGrey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-lightestGrey animation-effect">
              Discard
            </button>
            <button className="bodyText text-lightestGrey font-bold py-3 px-6 bg-[#373B53] hover:bg-almostBlack dark:hover:bg-darkGrey rounded-full dark:hover:text-white animation-effect">
              Save as Draft
            </button>
            <button className="bodyText text-white font-bold py-3 px-6 bg-purple dark:bg-purple rounded-full hover:bg-lightPurple  dark:hover:bg-lightPurple animation-effect">
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInvoiceModal;
