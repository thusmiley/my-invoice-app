import { useState } from "react";

export const useSessionStorage = (key, initialValue) => {
  const initial = JSON.parse(sessionStorage.getItem(key)) ?? initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
