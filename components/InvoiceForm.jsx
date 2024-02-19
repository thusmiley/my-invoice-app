"use client";
import Image from "next/image";
import backArrowIcon from "../public/icon-arrow-left.svg";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState, Fragment } from "react";
import { formatDate, formatCurrency, terms, data } from "@/utils";

import Datepicker from "./DatePicker";
import PaymentTerms from "./PaymentTerms";
import ItemListComponent from "./ItemListComponent";

const InvoiceForm = ({ addInvoice, setAddInvoice }) => {
  const [itemNum, setItemNum] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState(terms[3]);

  const methods = useForm();
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
      <FormProvider {...methods}>
        <form
          className="relative md:mt-[56px] md:px-[56px] "
          onSubmit={methods.handleSubmit(onSubmit)}
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
                Address
              </label>
              <input
                type="text"
                name="senderStreet"
                id="senderStreet"
                placeholder="1600 Amphitheatre Parkway, Mountain View"
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
            {/* city, zipcode, country group */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* city, zipcode group */}
              <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="form-control">
                  <label
                    htmlFor="senderCity"
                    className={`${
                      errors.senderCity ? "text-red" : ""
                    } bodyText mb-[10px]`}
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="senderCity"
                    id="senderCity"
                    placeholder="CA"
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
                <div className="form-control">
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
                    placeholder="94043"
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
              <div className="form-control">
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
                  placeholder="US"
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
                className={`${
                  errors.name ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Client's Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="on"
                placeholder="Naughty Cat"
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
                className={`${
                  errors.email ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Client's Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="on"
                placeholder="support@naughty-cat.com"
                {...register("email", {
                  required: "can't be empty",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`${errors.email ? "border-red" : ""} form-input`}
              />
              {errors.email && (
                <p className="errorMsg">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="clientStreet"
                className={`${
                  errors.clientStreet ? "text-red" : ""
                } bodyText mb-[10px]`}
              >
                Address
              </label>
              <input
                type="text"
                name="clientStreet"
                id="clientStreet"
                placeholder="2406 Columbus Ln, Madison"
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
            {/* city, zipcode, country group */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* city, zipcode group */}
              <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="form-control">
                  <label
                    htmlFor="clientCity"
                    className={`${
                      errors.clientCity ? "text-red" : ""
                    } bodyText mb-[10px]`}
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="clientCity"
                    id="clientCity"
                    placeholder="WI"
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
                <div className="form-control">
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
                    placeholder="53704"
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
              <div className="form-control">
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
                  placeholder="US"
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
                <span className="bodyText mb-[10px]">Invoice Date</span>
                <Datepicker />
              </div>
              <div className="form-control basis-1/2 relative md:w-1/2">
                <span className="bodyText mb-[10px]">Payment Terms</span>
                <PaymentTerms
                  selectedTerm={selectedTerm}
                  setSelectedTerm={setSelectedTerm}
                />
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
                placeholder="Graphic Design Service"
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
              <button
                className="bodyText font-bold py-3 px-6 bg-[#F9FAFE] dark:bg-[#F9FAFE] dark:text-blueGrey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-lightestGrey animation-effect"
                onClick={() => setAddInvoice(false)}
              >
                Discard
              </button>
              <button className="bodyText text-lightestGrey font-bold py-3 px-6 bg-[#373B53] hover:bg-almostBlack dark:hover:bg-darkGrey rounded-full dark:hover:text-white animation-effect">
                Save as Draft
              </button>
              <button className="bodyText text-white font-bold py-3 px-6 bg-purple dark:bg-purple rounded-full hover:bg-lightPurple  dark:hover:bg-lightPurple animation-effect">
                Save
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default InvoiceForm;
