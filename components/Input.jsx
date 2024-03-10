"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

const Input = ({ name, type, onChange, ref }) => {
  const [invalid, setInvalid] = useState(false);
  const handleInvalid = (e) => {
    e.preventDefault();

    const missing = e.target.validity.valueMissing;
    const valid = e.target.validity.valid;

    if (missing || !valid) {
      setInvalid(true);
    }
  };

  const handleChange = (e) => {
    setInvalid(false);
    onchange(e);
  };

  return (
    <div className="form-control">
      <label
        htmlFor={name}
        className={`${invalid ? "text-red" : ""} bodyText mb-[10px]`}
      >
        Address
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder="1600 Amphitheatre Parkway, Mountain View"
        value={data.billFromStreetAddress}
        {...register("senderStreet", {})}
        className={`${invalid ? "border-red" : ""} form-input truncate`}
        onChange={handleChange}
      />
      {invalid && <p className="errorMsg">can't be empty</p>}
    </div>
  );
};

export default Input;
