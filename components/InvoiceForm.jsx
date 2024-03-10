"use client";
import Image from "next/image";
import backArrowIcon from "../public/icon-arrow-left.svg";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useEffect, useState, Fragment, useRef } from "react";
import {
  formatDate,
  formatCurrency,
  terms,
  findPaymentTerms,
  findPaymentDueDate,
  Schema,
  DraftSchema,
} from "@/utils";
import {
  createInvoiceNum,
  uniqueInvoiceNum,
} from "@/utils/createUniqueInvoiceNum";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Datepicker from "./DatePicker";
import PaymentTerms from "./PaymentTerms";
import ItemListArray from "./ItemListArray";
import { useInvoiceContext } from "@/context/InvoiceContext";

const InvoiceForm = ({
  invoice,
  isAddInvoice,
  setIsAddInvoice,
  isEditInvoice,
  setIsEditInvoice,
}) => {
  const router = useRouter();
  const { invoices, editInvoice, addInvoice } = useInvoiceContext();
  const [data, setData] = useState(invoice);

  const [invoiceItems, setInvoiceItems] = useState(invoice?.invoiceItems);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      invoiceItems,
      amountDue: invoiceItems
        .map((item) => +item.total)
        .reduce((acc, val) => (acc += val)),
    }));
  }, [invoiceItems]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "firstError",
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(Schema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    console.log("Default schema is valid!");
    if (!data.invoiceNum) {
      let invoiceNum = createInvoiceNum();
      const invoiceNums = invoices.map((item) => item.invoiceNum);

      while (!uniqueInvoiceNum(invoiceNum, invoiceNums)) {
        invoiceNum = createInvoiceNum();
      }

      setData((prev) => ({ ...prev, invoiceNum, status: "pending" }));
      addInvoice({ ...data, status: "pending", invoiceNum });
      return quitAndReset();
    }

    if (isEditInvoice) {
      editInvoice(data.invoiceNum, { ...data, status: "pending" });
      setData({ ...data, status: "pending" });
      return quitAndReset();
    }

    // if (isAddInvoice) {
    //   addInvoice({ ...data, status: "pending" });
    //   setData({ ...data, status: "pending" });
    //   return quitAndReset();
    // }
  });

  const saveDraft = async () => {
    try {
      await DraftSchema.validate(data, { abortEarly: false });
      console.log("Draft schema valid!");
      console.log(data);

      if (!data.invoiceNum) {
        let invoiceNum = createInvoiceNum();
        const invoiceNums = invoices.map((item) => item.invoiceNum);
        while (!uniqueInvoiceNum(invoiceNum, invoiceNums)) {
          invoiceNum = createInvoiceNum();
        }

        addInvoice({ ...data, invoiceNum });
      } else {
        addInvoice(data);
      }
      return quitAndReset();
    } catch (error) {
      console.log(error);
    }
  };

  const quitAndReset = () => {
    setIsAddInvoice(false);
    setIsEditInvoice(false);
    setData(emptyInvoice);
    setInvoiceItems([{ name: "", quantity: "", price: "", total: "" }]);
    window.location.reload();
  };

  const handleCancel = () => {
    if (invoice) {
      setData(invoice);
    }
    if (isAddInvoice) {
      setIsAddInvoice(false);
    }
    if (isEditInvoice) {
      setIsEditInvoice(false);
    }
    return;
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
            {invoice?.invoiceNum}
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
              value={data.billFromStreetAddress}
              {...register("senderStreet", {})}
              className={`${
                errors.senderStreet ? "border-red" : ""
              } form-input truncate`}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  billFromStreetAddress: e.target.value,
                }))
              }
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
                  value={data.billFromCity}
                  {...register("senderCity", {})}
                  className={`${
                    errors.senderCity ? "border-red" : ""
                  } form-input`}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      billFromCity: e.target.value,
                    }))
                  }
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
                  value={data.billFromPostalCode}
                  {...register("senderZipCode", {})}
                  className={`${
                    errors.senderZipCode ? "border-red" : ""
                  } form-input`}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      billFromPostalCode: e.target.value,
                    }))
                  }
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
                value={data.billFromCountry}
                {...register("senderCountry", {})}
                className={`${
                  errors.senderCountry ? "border-red" : ""
                } form-input`}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    billFromCountry: e.target.value,
                  }))
                }
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
              value={data.billToName}
              {...register("name", {})}
              className={`${errors.name ? "border-red" : ""} form-input`}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  billToName: e.target.value,
                }))
              }
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
              value={data.billToEmail}
              {...register("email", {})}
              className={`${errors.email ? "border-red" : ""} form-input`}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  billToEmail: e.target.value,
                }))
              }
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
              value={data.billToStreetAddress}
              {...register("clientStreet", {})}
              className={`${
                errors.clientStreet ? "border-red" : ""
              } form-input truncate`}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  billToStreetAddress: e.target.value,
                }))
              }
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
                  value={data.billToCity}
                  {...register("clientCity", {})}
                  className={`${
                    errors.clientCity ? "border-red" : ""
                  } form-input`}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      billToCity: e.target.value,
                    }))
                  }
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
                  value={data.billToPostalCode}
                  {...register("clientZipCode", {})}
                  className={`${
                    errors.clientZipCode ? "border-red" : ""
                  } form-input`}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      billToPostalCode: e.target.value,
                    }))
                  }
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
                value={data.billToCountry}
                {...register("clientCountry", {})}
                className={`${
                  errors.clientCountry ? "border-red" : ""
                } form-input`}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    billToCountry: e.target.value,
                  }))
                }
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
                date={data.date}
                setData={setData}
                isAddInvoice={isAddInvoice}
                isEditInvoice={isEditInvoice}
              />
            </div>
            <div className="form-control basis-1/2 relative md:w-1/2">
              <span className="bodyText mb-[10px]">Payment Terms</span>
              <PaymentTerms data={data} setData={setData} />
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
              value={data.projectDescription}
              {...register("projectDescription", {})}
              className={`${
                errors.projectDescription ? "border-red" : ""
              } form-input truncate`}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  projectDescription: e.target.value,
                }))
              }
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
            items={invoiceItems}
            setItems={setInvoiceItems}
            isAddInvoice={isAddInvoice}
            isEditInvoice={isEditInvoice}
            {...{ control, register, errors }}
          />
        </div>

        <div className="mt-6 w-full flex flex-col h-[155px] md:h-[112px]">
          <div className="h-[64px] -mx-6 linear-bg overflow-hidden md:hidden"></div>
          <div
            className={`${isAddInvoice ? "justify-between" : ""} ${
              isEditInvoice ? "justify-end" : ""
            } bg-white -mx-6 overflow-hidden dark:bg-darkGrey p-6 flex space-x-2  dark:md:bg-darkestGrey md:py-8`}
          >
            <button
              type="button"
              className="bodyText text-[12px] md:text-[16px] font-bold py-3 px-6 text-blueGrey bg-[#F9FAFE] dark:bg-grey dark:text-lightestGrey rounded-full hover:bg-lightestGrey dark:hover:text-grey dark:hover:bg-white animation-effect"
              onClick={handleCancel}
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
