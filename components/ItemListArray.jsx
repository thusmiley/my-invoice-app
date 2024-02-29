"use client";
import ItemComponent from "./ItemComponent";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatCurrency } from "@/utils";

const ItemListArray = ({
  itemArray,
  setItemArray,
  isAddInvoice,
  isEditInvoice,
  control,
  register,
  errors,
}) => {
  const [itemName, setItemName] = useState();
  const [itemQty, setItemQty] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemTotal, setItemTotal] = useState();

  return (
    <>
      <ul>
        {itemArray.map((item) => {
          return (
            <div key={item.id} className="relative">
              <ItemComponent
                itemName={isEditInvoice ? item.name : ""}
                setItemName={setItemName}
                itemQty={isEditInvoice ? item.quantity : ""}
                setItemQty={setItemQty}
                itemPrice={isEditInvoice ? item.price : ""}
                setItemPrice={setItemPrice}
                itemTotal={item.total}
                setItemTotal={setItemTotal}
                item={item}
                id={item.id}
                isAddInvoice={isAddInvoice}
                isEditInvoice={isEditInvoice}
                {...{ control, register, errors }}
              />
              {itemArray.length > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (itemArray.length > 1) {
                      setItemArray(
                        itemArray.filter((card) => card.id !== item.id)
                      );
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
        onClick={() =>
          setItemArray([
            ...itemArray,
            {
              id: uuidv4(),
              name: "",
              quantity: "",
              price: "",
              total: "0.00",
            },
          ])
        }
      >
        + Add New Item
      </button>
    </>
  );
};

export default ItemListArray;
