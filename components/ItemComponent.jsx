"use client";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";

const ItemComponent = ({
  itemName,
  setItemName,
  itemQty,
  setItemQty,
  itemPrice,
  setItemPrice,
  itemTotal,
  setItemTotal,
  item,
  id,
  isAddInvoice,
  isEditInvoice,
  control,
  register,
  errors,
}) => {
  //   const [itemName, setItemName] = useState(() => {
  //     if (isAddInvoice) {
  //       return "";
  //     }
  //     if (isEditInvoice) {
  //       return item.name;
  //     }
  //   });
  //   const [itemQty, setItemQty] = useState(() => {
  //     if (isAddInvoice) {
  //       return "";
  //     }
  //     if (isEditInvoice) {
  //       return item.quantity;
  //     }
  //   });
  //   const [itemPrice, setItemPrice] = useState(() => {
  //     if (isAddInvoice) {
  //       return "";
  //     }
  //     if (isEditInvoice) {
  //       return item.price;
  //     }
  //   });
  //   const [itemTotal, setItemTotal] = useState(() => {
  //     if (isAddInvoice && itemQty && itemPrice) {
  //       return formatCurrency(itemQty * itemPrice);
  //     } else {
  //       return item.total;
  //     }

  //     if (isEditInvoice) {
  //       return formatCurrency(item.total);
  //     }
  //   });

  return (
    <li className="space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label
          htmlFor={`itemName${id}`}
          className={`${errors.itemName ? "text-red" : ""} bodyText mb-[10px]`}
        >
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          id={`itemName${id}`}
          defaultValue={itemName}
          placeholder="New Item"
          {...register("itemName", {
            required: "can't be empty",
          })}
          className={`${
            errors.itemName ? "border-red" : ""
          } form-input truncate`}
          onChange={(e) => setItemName(e.target.value)}
        />
        {errors.itemName && (
          <p className="errorMsg">{errors.itemName.message}</p>
        )}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label
            htmlFor={`qty${id}`}
            className={`${errors.qty ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Qty.
          </label>
          <input
            type="text"
            name="qty"
            id={`qty${id}`}
            placeholder="0"
            defaultValue={itemQty}
            {...register(`qty`, {
              required: "Required",
            })}
            className={`${errors.qty ? "border-red" : ""} form-input`}
            onChange={(e) => setItemQty(e.target.value)}
          />
          {errors.qty && <p className="errorMsg">{errors.qty.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <label
            htmlFor={`price${id}`}
            className={`${errors.price ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id={`price${id}`}
            placeholder="0"
            defaultValue={item.price}
            {...register(`price`, {
              required: "Required",
            })}
            className={`${errors.price ? "border-red" : ""} form-input`}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          {errors.price && <p className="errorMsg">{errors.price.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <span className="bodyText mb-[10px]">Total</span>
          <p className="py-4 bodyText font-bold text-lightGrey">{itemTotal}</p>
        </div>
      </div>
    </li>
  );
};

export default ItemComponent;
