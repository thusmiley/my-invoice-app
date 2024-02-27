"use client";
import Image from "next/image";
import backArrowIcon from "../public/icon-arrow-left.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState, Fragment } from "react";
import {
  formatDate,
  formatCurrency,
  terms,
  data,
  differenceInDays,
  Schema,
  DraftSchema,
} from "@/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Datepicker from "./DatePicker";
import PaymentTerms from "./PaymentTerms";
import ItemListArray from "./ItemListArray";

const InvoiceForm = ({
  invoice,
  isAddInvoice,
  setIsAddInvoice,
  isEditInvoice,
  setIsEditInvoice,
  getValues,
}) => {
  const [selectedTerm, setSelectedTerm] = useState();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({
    criteriaMode: "firstError",
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(Schema),
  });

  const onSubmit = handleSubmit((_data) => {
    console.log("Schema valid!");
    setIsAddInvoice(false);
  });

  const saveDraft = async () => {
    const data = getValues();

    try {
      await DraftSchema.validate(data, { abortEarly: false });
      console.log("Draft schema valid!");
      setIsAddInvoice(false);
    } catch (error) {
      error.inner?.map((inner, index) => {
        const { type, path, errors } = inner;
        return setError(path, { type, message: errors[index] });
      });
    }
  };

  return (
    <div className="fixed h-[100dvh] overflow-y-scroll no-scrollbar z-50 w-full top-[72px] left-0 right-0 bottom-0 px-6 mx-auto pb-[72px] bg-white dark:bg-darkestGrey md:w-[80%] md:top-[80px] md:left-0 md:ml-0 md:rounded-r-[20px] md:pb-[80px] max-w-[719px] xl:top-0 xl:left-[103px] xl:pb-0 xl:h-screen">
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey animation-effect md:hidden"
        onClick={() => {
          if (isAddInvoice) {
            setIsAddInvoice(false);
          }
          if (isEditInvoice) {
            setIsEditInvoice(false);
          }
        }}
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
      <form className="relative md:mt-[56px] md:px-[56px]" onSubmit={onSubmit}>
        {isAddInvoice && <h1 className="priceText text-[28px]">New Invoice</h1>}
        {isEditInvoice && (
          <h1 className="priceText text-[28px]">
            Edit <span className="text-[#777F98]">#</span>
            {invoice?.id}
          </h1>
        )}
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
              value={invoice ? invoice.billFromStreetAddress : ""}
              {...register("senderStreet", {})}
              className={`${
                errors.senderStreet ? "border-red" : ""
              } form-input truncate`}
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
                  value={invoice ? invoice.billFromCity : ""}
                  {...register("senderCity", {
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
                  type="text"
                  name="senderZipCode"
                  id="senderZipCode"
                  placeholder="94043"
                  value={invoice ? invoice.billFromPostalCode : ""}
                  {...register("senderZipCode", {
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
                value={invoice ? invoice.billFromCountry : ""}
                {...register("senderCountry", {
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
              autoComplete="on"
              placeholder="Naughty Cat"
              value={invoice ? invoice.billToName : ""}
              {...register("name", {})}
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
              autoComplete="on"
              placeholder="support@naughty-cat.com"
              value={invoice ? invoice.billToEmail : ""}
              {...register("email", {
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
              Address
            </label>
            <input
              type="text"
              name="clientStreet"
              id="clientStreet"
              placeholder="2406 Columbus Ln, Madison"
              value={invoice ? invoice.billToStreetAddress : ""}
              {...register("clientStreet", {})}
              className={`${
                errors.clientStreet ? "border-red" : ""
              } form-input truncate`}
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
                  value={invoice ? invoice.billToCity : ""}
                  {...register("clientCity", {
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
                  type="text"
                  name="clientZipCode"
                  id="clientZipCode"
                  placeholder="53704"
                  value={invoice ? invoice.billToPostalCode : ""}
                  {...register("clientZipCode", {
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
                value={invoice ? invoice.billToCountry : ""}
                {...register("clientCountry", {
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
              <Datepicker
                date={invoice ? invoice.createdAt : new Date()}
                isAddInvoice={isAddInvoice}
                isEditInvoice={isEditInvoice}
              />
            </div>
            <div className="form-control basis-1/2 relative md:w-1/2">
              <span className="bodyText mb-[10px]">Payment Terms</span>
              <PaymentTerms
                selectedTerm={
                  invoice
                    ? differenceInDays(invoice.date, invoice.paymentTerms)
                    : terms[3]
                }
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
              value={invoice ? invoice.projectDescription : ""}
              {...register("projectDescription", {})}
              className={`${
                errors.projectDescription ? "border-red" : ""
              } form-input truncate`}
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
          <ItemListArray
            array={invoice?.items}
            isAddInvoice={isAddInvoice}
            isEditInvoice={isEditInvoice}
            {...{ control, register, errors }}
          />
        </div>

        <div className="mt-6 w-full flex flex-col h-[155px] md:h-[112px]">
          <div className="h-[64px] -mx-6 linear-bg overflow-hidden md:hidden"></div>
          <div
            className={`${isAddInvoice ? "justify-between" : ""} ${
              isEditInvoice ? "justify-end space-x-2" : ""
            } bg-white -mx-6 overflow-hidden dark:bg-darkGrey p-6 flex  dark:md:bg-darkestGrey md:py-8`}
          >
            <button
              type="button"
              className="bodyText text-[12px] md:text-[16px] font-bold py-3 px-6 text-blueGrey bg-[#F9FAFE] dark:bg-grey dark:text-lightestGrey rounded-full hover:bg-lightestGrey dark:hover:text-grey dark:hover:bg-white animation-effect"
              onClick={() => {
                if (isAddInvoice) {
                  setIsAddInvoice(false);
                }
                if (isEditInvoice) {
                  setIsEditInvoice(false);
                }
              }}
            >
              {isAddInvoice && "Discard"}
              {isEditInvoice && "Cancel"}
            </button>
            {isAddInvoice && (
              <button
                type="button"
                className="bodyText text-[12px] md:text-[16px] text-lightGrey bg-[#373B53] hover:bg-almostBlack dark:text-lightestGrey font-bold py-3 px-6 dark:bg-[#373B53]  dark:hover:bg-darkGrey rounded-full dark:hover:text-lightestGrey animation-effect"
                onClick={saveDraft}
              >
                Save as Draft
              </button>
            )}
            <button
              type="submit"
              className="bodyText text-[12px] md:text-[16px] text-white dark:text-white font-bold py-3 px-6 bg-purple dark:bg-purple rounded-full hover:bg-lightPurple dark:hover:bg-lightPurple animation-effect"
            >
              {isAddInvoice && "Save"}
              {isEditInvoice && "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
