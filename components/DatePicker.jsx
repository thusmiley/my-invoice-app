"use client";
import { useEffect, useState, forwardRef } from "react";
import arrowLeft from "../public/icon-arrow-left.svg";
import arrowRight from "../public/icon-arrow-right.svg";
import Image from "next/image";

import DatePicker from "react-datepicker";
import "../app/styles/datepicker.css";

const Datepicker = ({ date, isAddInvoice, isEditInvoice, setData }) => {
  return (
    <DatePicker
      selected={date}
      dateFormat="PP"
      showIcon
      icon={
        <svg width="16" height="16" alt="" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
            fill="#7E88C3"
            fillRule="nonzero"
            opacity=".5"
          />
        </svg>
      }
      toggleCalendarOnIconChange
      closeOnScroll={true}
      onChange={(date) =>
        setData((prev) => ({
          ...prev,
          date: date,
        }))
      }
      onFocus={(e) => (e.target.readOnly = true)}
      readOnly={isEditInvoice ? true : false}
    />
  );
};

export default Datepicker;
