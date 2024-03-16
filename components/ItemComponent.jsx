"use client";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ItemComponent = ({
  item,
  index,
  isAddInvoice,
  isEditInvoice,
  onNameChange,
  onQuantityChange,
  onPriceChange,
  onDelete,
//   errors,
}) => {
  const methods = useFormContext();
  const [itemQty, setItemQty] = useState(item.quantity);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemTotal, setItemTotal] = useState(+itemPrice * itemQty);

  useEffect(() => {
    setItemTotal(formatCurrency(+itemPrice * itemQty));
  }, [itemQty, itemPrice]);

  return (
    <div className="relative space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label htmlFor={`name${index}`} className={`bodyText mb-[10px]`}>
          Item Name
        </label>
        <input
          id={`name${index}`}
          defaultValue={item.name}
          placeholder="New Item"
          {...methods.register(`invoiceItems.${index}.name`)}
          className={`form-input truncate`}
          onChange={onNameChange}
        />
        {/* {errors.invoiceItems && (
          <p className="errorMsg">{errors.invoiceItems.message}</p>
        )} */}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label htmlFor={`qty${index}`} className={` bodyText mb-[10px]`}>
            Qty.
          </label>
          <input
            id={`qty${index}`}
            placeholder="0"
            defaultValue={itemQty}
            {...methods.register(`invoiceItems.${index}.quantity`)}
            className={` form-input`}
            onChange={(e) => {
              setItemQty(+e.target.value);
              onQuantityChange(e);
            }}
          />
          {/* {errors.invoiceItems && (
            <p className="errorMsg">{errors.invoiceItems.message}</p>
          )} */}
        </div>
        <div className="form-control w-[35%]">
          <label htmlFor={`price${index}`} className={`bodyText mb-[10px]`}>
            Price
          </label>
          <input
            id={`price${index}`}
            placeholder="0"
            defaultValue={formatCurrency(itemPrice)}
            {...methods.register(`invoiceItems.${index}.price`)}
            className={` form-input`}
            onChange={(e) => {
              setItemPrice(e.target.value);
              onPriceChange(e);
            }}
            onBlur={() => setItemPrice((prev) => +formatCurrency(prev))}
          />
          {/* {errors.invoiceItems && (
            <p className="errorMsg">{errors.invoiceItems.message}</p>
          )} */}
        </div>
        <div className="form-control w-[35%] pr-5">
          <label htmlFor={`total${index}`} className="bodyText mb-[10px]">
            Total
          </label>
          <input
            id={`total${index}`}
            placeholder="0.00"
            value={formatCurrency(itemTotal)}
            {...methods.register(`invoiceItems.${index}.total`)}
            className="py-4 pr-5 text-almostBlack bodyText font-bold bg-transparent placeholder:text-lightGrey outline-none truncate"
            disabled
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="cursor-pointer absolute right-0 bottom-[70px] animation-effect"
      >
        <svg
          width="13"
          height="16"
          alt=""
          className="deleteIcon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </div>
  );
};

export default ItemComponent;
