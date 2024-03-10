"use client";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";

const ItemComponent = ({
  item,
  index,
  isAddInvoice,
  isEditInvoice,
  control,
  register,
  errors,
  onNameChange,
  onQuantityChange,
  onPriceChange,
  onDelete,
}) => {
  const [itemQty, setItemQty] = useState(item.quantity);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemTotal, setItemTotal] = useState(+itemPrice * itemQty);

  useEffect(() => {
    setItemTotal(formatCurrency(+itemPrice * itemQty));
  }, [itemQty, itemPrice]);

  return (
    <div className="relative space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label
          htmlFor={`name${index}`}
          className={`${errors.nameindex ? "text-red" : ""} bodyText mb-[10px]`}
        >
          Item Name
        </label>
        <input
          id={`name${index}`}
          value={item.name}
          placeholder="New Item"
          {...register(`name${index}`)}
          className={`${
            errors.nameindex ? "border-red" : ""
          } form-input truncate`}
          onChange={onNameChange}
        />
        {errors.nameindex && (
          <p className="errorMsg">{errors.nameindex.message}</p>
        )}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label
            htmlFor={`qty${index}`}
            className={`${
              errors.qtyindex ? "text-red" : ""
            } bodyText mb-[10px]`}
          >
            Qty.
          </label>
          <input
            id={`qty${index}`}
            placeholder="0"
            value={itemQty}
            {...register(`qty${index}`)}
            className={`${errors.qtyindex ? "border-red" : ""} form-input`}
            onChange={(e) => {
              setItemQty(+e.target.value);
              onQuantityChange(e);
            }}
          />
          {errors.qtyindex && (
            <p className="errorMsg">{errors.qtyindex.message}</p>
          )}
        </div>
        <div className="form-control w-[35%]">
          <label
            htmlFor={`price${index}`}
            className={`${
              errors.priceindex ? "text-red" : ""
            } bodyText mb-[10px]`}
          >
            Price
          </label>
          <input
            id={`price${index}`}
            placeholder="0"
            value={formatCurrency(itemPrice)}
            {...register(`price${index}`)}
            className={`${errors.priceindex ? "border-red" : ""} form-input`}
            onChange={(e) => {
              setItemPrice(e.target.value);
              onPriceChange(e);
            }}
            onBlur={() => setItemPrice((prev) => +formatCurrency(prev))}
          />
          {errors.priceindex && (
            <p className="errorMsg">{errors.priceindex.message}</p>
          )}
        </div>
        <div className="form-control w-[35%] pr-5">
          <label htmlFor={`total${index}`} className="bodyText mb-[10px]">
            Total
          </label>
          <input
            id={`total${index}`}
            placeholder="0.00"
            value={formatCurrency(itemTotal)}
            {...register(`total${index}`)}
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
