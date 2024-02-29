"use client";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";

const ItemComponent = ({
  item,
  id,
  isAddInvoice,
  isEditInvoice,
  control,
  register,
  errors,
  getValues,
}) => {
  const [itemName, setItemName] = useState(item.name ? item.name : "");
  const [itemQty, setItemQty] = useState(item.quantity ? item.quantity : "");
  const [itemPrice, setItemPrice] = useState(item.price ? item.price : "");
  const [itemTotal, setItemTotal] = useState(
    item.total ? formatCurrency(item.total) : "0.00"
  );

  useEffect(() => {
    setItemTotal(formatCurrency(itemQty * itemPrice));
  }, [itemQty, itemPrice]);

  return (
    <li className="space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label
          htmlFor={`itemName${id}`}
          className={`${
            errors.itemNameid ? "text-red" : ""
          } bodyText mb-[10px]`}
        >
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          id={`itemName${id}`}
          defaultValue={itemName}
          placeholder="New Item"
          {...register(`itemName${id}`, {
            required: "can't be empty",
          })}
          className={`${
            errors.itemNameid ? "border-red" : ""
          } form-input truncate`}
          onChange={(e) => setItemName(e.target.value)}
        />
        {errors.itemNameid && (
          <p className="errorMsg">{errors.itemNameid.message}</p>
        )}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label
            htmlFor={`qty${id}`}
            className={`${errors.qtyid ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Qty.
          </label>
          <input
            type="number"
            name="qty"
            id={`qty${id}`}
            placeholder="0"
            defaultValue={itemQty}
            {...register(`qty${id}`, {
              required: "Required",
            })}
            className={`${errors.qtyid ? "border-red" : ""} form-input`}
            onChange={(e) => {
              setItemQty(e.target.value);
             
            }}
          />
          {errors.qtyid && <p className="errorMsg">{errors.qtyid.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <label
            htmlFor={`price${id}`}
            className={`${errors.priceid ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id={`price${id}`}
            placeholder="0"
            defaultValue={itemPrice}
            {...register(`price${id}`, {
              required: "Required",
            })}
            className={`${errors.priceid ? "border-red" : ""} form-input`}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          {errors.priceid && (
            <p className="errorMsg">{errors.priceid.message}</p>
          )}
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
