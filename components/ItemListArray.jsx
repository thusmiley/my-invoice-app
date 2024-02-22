"use client";
import { useFieldArray } from "react-hook-form";
import ItemComponent from "./ItemComponent";
import { useEffect } from "react";

const ItemListArray = ({
  array,
  addInvoice,
  editInvoice,
  control,
  register,
  errors,
}) => {
  const defaultValue = [{ itemName: "", qty: "", price: "" }];

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "listItem",
  });

  useEffect(() => {
    defaultValue.forEach((field, index) => {
      Object.keys(field).forEach((key) => {
        update(index, field[key]);
      });
    });
  }, [defaultValue, update]);

  console.log(fields);

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="relative">
              <ItemComponent
                defaultValue={defaultValue}
                key={item.id}
                {...{ index, control, register, errors }}
              />
              {fields.length > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                    }
                  }}
                  className="cursor-pointer absolute right-5 bottom-[70px] animation-effect"
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
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </ul>
      <button
        type="button"
        className="bg-[#F9FAFE] dark:bg-darkGrey rounded-[24px] py-4 w-full bodyText text-blueGrey hover:text-blueGrey dark:text-lightGrey font-bold hover:bg-lightestGrey dark:hover:text-white animation-effect dark:hover:bg-grey"
        onClick={() => {
          append({ itemName: "", qty: "", price: "" });
        }}
      >
        + Add New Item
      </button>
    </>
  );
};

export default ItemListArray;
