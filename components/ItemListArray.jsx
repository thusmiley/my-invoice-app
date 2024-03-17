"use client";
import { formatCurrency } from "@/utils";
import ItemComponent from "./ItemComponent";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

const ItemListArray = ({
  items,
  setItems,
  isAddInvoice,
  isEditInvoice,
  register,
  errors,
  setValue,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoiceItems",
  });

  const handleItemAdd = () => {
    append({ name: "New Item", quantity: 1, price: 0, total: 0 });
    setItems((prev) => [
      ...prev,
      {
        name: "New Item",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleItemDelete = (index) => {
    remove(index);
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
        }
        return item;
      })
    );
  };

  const handlePriceChange = (e, index) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            price: +e.target.value,
            total: +e.target.value * item.quantity,
          };
        }
        return item;
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
        }
        return item;
      })
    );
  };

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <ItemComponent
            key={index}
            item={item}
            index={index}
            isAddInvoice={isAddInvoice}
            isEditInvoice={isEditInvoice}
            onNameChange={(e) => handleNameChange(e, index)}
            onQuantityChange={(e) => handleQuantityChange(e, index)}
            onPriceChange={(e) => handlePriceChange(e, index)}
            onDelete={() => handleItemDelete(index)}
            {...{ register, errors, setValue, control }}
          />
        );
      })}
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
