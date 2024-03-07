"use client";
import { formatCurrency } from "@/utils";
import ItemComponent from "./ItemComponent";
import { useEffect, useState } from "react";

const ItemListArray = ({
  items,
  setItems,
  isAddInvoice,
  isEditInvoice,
  control,
  register,
  errors,
}) => {
  const handleItemAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        name: "",
        quantity: "",
        price: "",
        total: "",
      },
    ]);
  };

  const handleItemDelete = (index) => {
    setItems((prev) => prev.filter((item, i) => i !== index));
  };

  const handleQuantityChange = (e, index) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            quantity: +e.target.value,
            total: +e.target.value * item.price,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handlePriceChange = (e, index) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            quantity: +e.target.value,
            total: +e.target.value * item.price,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleNameChange = (e, index) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            name: e.target.value,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div>
      {items?.map((item, index) => (
        <ItemComponent
          key={index}
              item={item}
              index={index}
          isAddInvoice={isAddInvoice}
          isEditInvoice={isEditInvoice}
          {...{ control, register, errors }}
          onNameChange={(e) => handleNameChange(e, index)}
          onQuantityChange={(e) => handleQuantityChange(e, index)}
          onPriceChange={(e) => handlePriceChange(e, index)}
          onDelete={() => handleItemDelete(index)}
        />
      ))}
      <button
        type="button"
        className="bg-[#F9FAFE] dark:bg-darkGrey rounded-[24px] py-4 w-full bodyText text-blueGrey hover:text-blueGrey dark:text-lightGrey font-bold hover:bg-lightestGrey dark:hover:text-white animation-effect dark:hover:bg-grey"
        onClick={handleItemAdd}
      >
        + Add New Item
      </button>
    </div>
  );
};

export default ItemListArray;
