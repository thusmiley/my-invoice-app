"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import avatar from "../public/image-avatar.jpg";
import { useInvoiceContext } from "@/context/InvoiceContext";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { userData, addInvoice, setAddInvoice, isDemo, setIsDemo } =
    useInvoiceContext();
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  console.log(userData);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 w-full z-10 xl:h-screen xl:w-[103px]">
      <nav className="bg-[#373B53] dark:bg-darkGrey flex justify-between items-center xl:flex-col xl:justify-start xl:fixed xl:top-0 xl:rounded-r-[30px] xl:items-stretch xl:h-full">
        <Link href="/dashboard" onClick={() => setAddInvoice(false)}>
          <svg
            className="h-[72px] w-auto object-cover object-center md:h-20 xl:w-[103px] xl:h-auto"
            alt="my invoice logo"
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
          >
            <path
              d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
              fill="#7C5DFA"
            />
            <mask
              id="mask0_0_1479"
              styles="mask-type:luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="72"
              height="72"
            >
              <path
                d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_0_1479)">
              <path
                d="M72 36.3496H20C8.95431 36.3496 0 45.3039 0 56.3496V88.3496C0 99.3953 8.95431 108.35 20 108.35H72V36.3496Z"
                fill="#9277FF"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.486 23.0003L36 35.8995L42.514 23.0003C46.9652 25.3092 50 29.9105 50 35.21C50 42.8261 43.732 49.0002 36 49.0002C28.268 49.0002 22 42.8261 22 35.21C22 29.9105 25.0348 25.3092 29.486 23.0003Z"
              fill="white"
            />
          </svg>
        </Link>

        <div className="flex justify-end items-center mr-6 md:mr-[48px] xl:flex-col xl:justify-center xl:mr-0 xl:absolute xl:bottom-6">
          {darkMode ? (
            <svg
              width="20"
              height="20"
              alt="toggle dark mode"
              className="w-5 h-auto object-contain object-center darkMode-icon cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
                fill="#858BB2"
                fillRule="nonzero"
                onClick={toggleTheme}
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              alt="toggle dark mode"
              className="w-5 h-auto object-contain object-center darkMode-icon cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z"
                fill="#7E88C3"
                fillRule="nonzero"
                onClick={toggleTheme}
              />
            </svg>
          )}

          <div className="w-[1px] h-[72px] bg-[#494E6E] mx-6 md:mx-8 md:h-20 xl:h-[1px] xl:w-[103px] xl:mx-0 xl:my-6" />
          <Image
            src={userData ? userData.photoUrl : avatar}
            width={32}
            height={32}
            alt="toggle dark mode"
            className="w-8 h-auto object-cover object-center rounded-full xl:w-10"
            priority={false}
            onClick={() => setProfileIsOpen(!profileIsOpen)}
          />
          {profileIsOpen && (
            <>
              <div
                className="fixed w-full h-full top-[72px] bottom-0 left-0 right-0 md:top-[80px] xl:top-0 xl:left-[103px]"
                onClick={() => setProfileIsOpen(!profileIsOpen)}
              />
              <div className="fixed top-[80px] right-6 bg-white dark:bg-darkGrey rounded-[8px] px-6 py-3 cursor-pointer box-shadow-invoiceCard slideup md:top-[88px] md:right-[48px] xl:bottom-6 xl:left-[111px] xl:top-auto xl:right-auto">
                {isDemo ? (
                  <Link
                    href={`https://api.invoice-app.naughty-cat.com/authentication/github`}
                    className="bodyText font-bold hover:text-purple"
                    onClick={() => setProfileIsOpen(!profileIsOpen)}
                  >
                    Sign in with Github
                  </Link>
                ) : (
                  <Link
                    href={`https://api.invoice-app.naughty-cat.com/logout`}
                    className="bodyText font-bold hover:text-purple"
                    onClick={() => setProfileIsOpen(!profileIsOpen)}
                  >
                    Sign Out
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
