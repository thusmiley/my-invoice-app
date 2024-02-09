"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext({ screenType: "phone" });

export function useScreenContext() {
  return useContext(ScreenContext);
}

const ScreenProvider({ children }) => {
  const [screenType, setScreenType] = useState('phone');
  const handleScreenResize = () => {
    if (!window) return;
    if (window.innerWidth < 768) {
      setScreenType("phone");
    } else if (window.innerWidth < 1440) {
      setScreenType("tablet");
    } else {
      setScreenType("desktop");
    }
  };

  const screenResizeEffect = () => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  };
    useEffect(() => { screenResizeEffect }, []);
  return (
    <ScreenContext.Provider value={ screenType }>
      {children}
    </ScreenContext.Provider>
  );
};


export { ScreenProvider, useScreenContext };
