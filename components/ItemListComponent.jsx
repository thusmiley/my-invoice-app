"use client";
import { formatCurrency } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ItemListComponent = () => {
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

  const [qty, setQty] = useState();
  const [price, setPrice] = useState();

  const total = formatCurrency(qty * price);

  return (
    <div className="space-y-6 pb-[48px] md:flex md:space-y-0 md:space-x-4">
      <div className="form-control md:w-[40%]">
        <label
          htmlFor="itemName"
          className={`${errors.itemName ? "text-red" : ""} bodyText mb-[10px]`}
        >
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          id="itemName"
          placeholder="New Item"
          {...register("itemName", {
            required: "can't be empty",
          })}
          className={`${errors.itemName ? "border-red" : ""} form-input`}
        />
        {errors.itemName && (
          <p className="errorMsg">{errors.itemName.message}</p>
        )}
      </div>
      <div className="flex space-x-4 w-full md:w-[60%]">
        <div className="form-control w-[20%]">
          <label
            htmlFor="qty"
            className={`${errors.qty ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Qty.
          </label>
          <input
            type="text"
            name="qty"
            id="qty"
            placeholder="0"
            {...register("qty", {
              required: "Required",
            })}
            className={`${errors.qty ? "border-red" : ""} form-input`}
            onChange={(e) => setQty(e.target.value)}
          />
          {errors.qty && <p className="errorMsg">{errors.qty.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <label
            htmlFor="price"
            className={`${errors.price ? "text-red" : ""} bodyText mb-[10px]`}
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="0"
            {...register("price", {
              required: "Required",
            })}
            className={`${errors.price ? "border-red" : ""} form-input`}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p className="errorMsg">{errors.price.message}</p>}
        </div>
        <div className="form-control w-[35%]">
          <span htmlFor="total" className="bodyText mb-[10px]">
            Total
          </span>
          <p className="py-4 bodyText font-bold text-lightGrey">
            {qty && price ? total : "0.00"}
          </p>
        </div>
        <div className="w-[10%] cursor-pointer relative">
          <svg
            width="13"
            height="16"
            alt=""
            className="deleteIcon animation-effect absolute bottom-6 right-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
              fill="#888EB0"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ItemListComponent;
