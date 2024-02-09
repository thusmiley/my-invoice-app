import { useState } from "react";

ToggleHandlers = {
  on: () => void,
  off: () => void,
  toggle: () => void,
};

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const handlers = useMemo(
    () => ({
      on: () => {
        setToggle(true);
      },
      off: () => {
        setToggle(false);
      },
      toggle: () => {
        setToggle((prev) => !prev);
      },
    }),
    [toggle, setToggle]
  );
  return [toggle, handlers];
};
