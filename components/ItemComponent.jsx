"use client";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const ItemComponent = ({
  key,
  defaultValue,
  index,
  control,
  register,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "listItem",
    rules: {
      required: true,
    },
  });
  const [qty, setQty] = useState();
  const [price, setPrice] = useState();
  const total = formatCurrency(qty * price);

  return (
    <li className="space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label
          htmlFor={`itemName${index}`}
          className={`${errors.itemName ? "text-red" : ""} bodyText mb-[10px]`}
        >
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          id={`itemName${index}`}
          defaultValue={defaultValue?.[index]?.[key]}
          placeholder="New Item"
          {...register(`listItem.${index}.itemName`, {
            required: "can't be empty",
          })}
          className={`${
            errors.itemName ? "border-red" : ""
          } form-input truncate`}
        />
        {errors.itemName && (
          <p className="errorMsg">{errors.itemName.message}</p>
        )}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label
            htmlFor={`qty${index}`}
            className={`${errors.qty ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Qty.
          </label>
          <input
            type="text"
            name="qty"
            id={`qty${index}`}
            placeholder="0"
            defaultValue={defaultValue?.[index]?.[key]}
            {...register(`listItem.${index}.qty`, {
              required: "Required",
            })}
            className={`${errors.qty ? "border-red" : ""} form-input`}
            onChange={(e) => setQty(e.target.value)}
          />
          {errors.qty && <p className="errorMsg">{errors.qty.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <label
            htmlFor={`price${index}`}
            className={`${errors.price ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id={`price${index}`}
            placeholder="0"
            defaultValue={defaultValue?.[index]?.[key]}
            {...register(`listItem.${index}.price`, {
              required: "Required",
            })}
            className={`${errors.price ? "border-red" : ""} form-input`}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p className="errorMsg">{errors.price.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <span className="bodyText mb-[10px]">Total</span>
          <p className="py-4 bodyText font-bold text-lightGrey">
            {qty && price ? total : "0.00"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ItemComponent;
