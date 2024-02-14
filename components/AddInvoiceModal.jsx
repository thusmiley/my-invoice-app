"use client";
import Image from "next/image";
import backArrowIcon from "../public/icon-arrow-left.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Datepicker from "./Datepicker";
import PaymentTerms from "./PaymentTerms";
import ItemListComponent from "./ItemListComponent";

const AddInvoiceModal = ({ addInvoice, setAddInvoice }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [itemNum, setItemNum] = useState(1);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    criteriaMode: "firstError",
    mode: "onChange",
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
    <div className="fixed h-screen z-50 w-full top-[72px] left-0 right-0 bottom-0 px-6 mx-auto pb-[250px] overflow-y-scroll bg-white dark:bg-darkestGrey">
      <button
        className="flex items-center bodyText font-bold text-almostBlack my-8 md:mt-[48px] hover:text-lightGrey animation-effect"
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
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="priceText text-[28px]">New Invoice</h1>
        {/* bill from  */}
        <div className="space-y-6">
          <h2 className="form-heading">Bill From</h2>
          <div className="flex flex-col">
            <label htmlFor="senderStreet" className="bodyText mb-[10px]">
              Street Address
            </label>
            <input
              type="text"
              name="senderStreet"
              id="senderStreet"
              {...register("senderStreet", {
                required: "Required",
              })}
              className="form-input"
            />
            {errors.senderStreet && (
              <p className="errorMsg">{errors.senderStreet.message}</p>
            )}
          </div>
          <div className="flex w-full space-x-6">
            <div className="flex flex-col basis-1/2">
              <label htmlFor="senderCity" className="bodyText mb-[10px]">
                City
              </label>
              <input
                type="text"
                name="senderCity"
                id="senderCity"
                {...register("senderCity", {
                  required: "Required",
                  pattern: {
                    value:
                      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
                    message: "Invalid city",
                  },
                })}
                className="form-input"
              />
              {errors.senderCity && (
                <p className="errorMsg">{errors.senderCity.message}</p>
              )}
            </div>
            <div className="flex flex-col basis-1/2">
              <label htmlFor="senderZipCode" className="bodyText mb-[10px]">
                Zip Code
              </label>
              <input
                type="number"
                name="senderZipCode"
                id="senderZipCode"
                {...register("senderZipCode", {
                  required: "Required",
                  pattern: {
                    value: /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/,
                    message: "Invalid zipcode",
                  },
                })}
                className="form-input"
              />
              {errors.senderZipCode && (
                <p className="errorMsg">{errors.senderZipCode.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="senderCountry" className="bodyText mb-[10px]">
              Country
            </label>
            <input
              type="text"
              name="senderCountry"
              id="senderCountry"
              {...register("senderCountry", {
                required: "Required",
                pattern: {
                  value: /[a-zA-Z]{2,}/,
                  message: "Invalid country",
                },
              })}
              className="form-input"
            />
            {errors.senderCountry && (
              <p className="errorMsg">{errors.senderCountry.message}</p>
            )}
          </div>
        </div>

        {/* bill to  */}
        <div className="space-y-6 pt-4">
          <h2 className="form-heading">Bill To</h2>
          <div className="flex flex-col">
            <label htmlFor="name" className="bodyText mb-[10px]">
              Client's Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", {
                required: "Required",
              })}
              className="form-input"
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="bodyText mb-[10px]">
              Client's Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g. email@example.com"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className="form-input"
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="clientStreet" className="bodyText mb-[10px]">
              Street Address
            </label>
            <input
              type="text"
              name="clientStreet"
              id="clientStreet"
              {...register("clientStreet", {
                required: "Required",
              })}
              className="form-input"
            />
            {errors.clientStreet && (
              <p className="errorMsg">{errors.clientStreet.message}</p>
            )}
          </div>
          <div className="flex w-full space-x-6">
            <div className="flex flex-col basis-1/2">
              <label htmlFor="clientCity" className="bodyText mb-[10px]">
                City
              </label>
              <input
                type="text"
                name="clientCity"
                id="clientCity"
                {...register("clientCity", {
                  required: "Required",
                  pattern: {
                    value:
                      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
                    message: "Invalid city",
                  },
                })}
                className="form-input"
              />
              {errors.clientCity && (
                <p className="errorMsg">{errors.clientCity.message}</p>
              )}
            </div>
            <div className="flex flex-col basis-1/2">
              <label htmlFor="clientZipCode" className="bodyText mb-[10px]">
                Zip Code
              </label>
              <input
                type="number"
                name="clientZipCode"
                id="clientZipCode"
                {...register("clientZipCode", {
                  required: "Required",
                  pattern: {
                    value: /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/,
                    message: "Invalid zipcode",
                  },
                })}
                className="form-input"
              />
              {errors.clientZipCode && (
                <p className="errorMsg">{errors.clientZipCode.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="clientCountry" className="bodyText mb-[10px]">
              Country
            </label>
            <input
              type="text"
              name="clientCountry"
              id="clientCountry"
              {...register("clientCountry", {
                required: "Required",
                pattern: {
                  value: /[a-zA-Z]{2,}/,
                  message: "Invalid country",
                },
              })}
              className="form-input"
            />
            {errors.clientCountry && (
              <p className="errorMsg">{errors.clientCountry.message}</p>
            )}
          </div>
        </div>

        {/* invoice  */}
        <div className="space-y-6 pt-8">
          <div className="flex flex-col">
            <label htmlFor="senderStreet" className="bodyText mb-[10px]">
              Invoice Date
            </label>
            {/* <input
              type="text"
              name="senderStreet"
              {...register("senderStreet", {
                required: "Required",
              })}
              className="form-input"
            />
            {errors.senderStreet && (
              <p className="errorMsg">{errors.senderStreet.message}</p>
            )} */}
            <Datepicker />
          </div>
          <div className="flex flex-col basis-1/2">
            <span className="bodyText mb-[10px]">Payment Terms</span>
            <PaymentTerms />
          </div>
          <div className="flex flex-col basis-1/2">
            <label htmlFor="projectDescription" className="bodyText mb-[10px]">
              Project Description
            </label>
            <input
              type="text"
              name="projectDescription"
              id="projectDescription"
              placeholder="e.g. Graphic Design Service"
              {...register("projectDescription", {
                required: "Required",
              })}
              className="form-input"
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

        <div className="bg-white dark:bg-darkGrey py-6 w-full overflow-hidden -ml-6 px-6 mt-[88px] absolute flex justify-between">
          <button className="bodyText font-bold py-3 px-6 bg-[#F9FAFE] dark:bg-grey rounded-full hover:bg-lightestGrey dark:hover:text-blueGrey dark:hover:bg-white animation-effect">
            Discard
          </button>
          <button className="bodyText font-bold py-3 px-6 bg-[#373B53] dark:bg-[#373B53] rounded-full hover:bg-lightestGrey dark:hover:text-white animation-effect">
            Save as Draft
          </button>
          <button className="bodyText font-bold py-3 px-6 bg-purple dark:bg-purple rounded-full hover:bg-lightestGrey dark:hover:text-white dark:hover:bg-lightPurple animation-effect">
            Save & Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInvoiceModal;
