"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { useInvoiceContext } from "@/context/InvoiceContext";

import "dotenv/config";

export default function Login() {
  const { setIsDemo, setIsLoggedin } = useInvoiceContext();

  useEffect(() => {
    setIsDemo(false);
    setIsLoggedin(false);
  }, []);

  return (
    <main className="flex justify-center items-center min-h-dvh mb-[90px] px-6 mx-auto md:px-[48px] md:max-w-[550px]">
      <Head>
        <title>Login | My Invoice App</title>
      </Head>

      <div className="bg-white dark:bg-darkGrey rounded-[8px] relative z-0 px-6 pt-8 pb-12 cursor-pointer box-shadow-invoiceCard md:px-8">
        <h1 className="priceText text-center text-[28px]">Login</h1>
        <p className="bodyText text-center mt-2 text-almostBlack dark:text-white md:max-w-[380px]">
          Please login as a guest to see Demo or sign in with a Github account.
        </p>
        <div className="flex md:space-x-4 items-center flex-col space-y-4 mt-8 md:flex-row md:space-y-0">
          <Link
            href="/dashboard"
            className="w-full text-lightGrey bg-[#373B53] hover:bg-almostBlack dark:text-lightestGrey font-bold py-3 px-6 dark:bg-[#373B53] text-center dark:hover:bg-darkGrey rounded-full dark:hover:text-lightestGrey animation-effect md:w-auto"
            onClick={() => setIsDemo(true)}
          >
            View as Demo
          </Link>
          <Link
            href={`${process.env.BACK_END_URL}/authentication/github`}
            className="w-full bg-purple font-bold text-white animation-effect rounded-full py-3 px-6 hover:bg-lightPurple flex items-center justify-center md:w-auto"
            onClick={() => setIsLoggedin(true)}
          >
            Sign in with Github
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              alt=""
              className="ml-3"
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M12.304 0C5.506 0 0 5.506 0 12.304c0 5.444 3.522 10.042 8.413 11.672.615.108.845-.261.845-.584 0-.292-.015-1.261-.015-2.291-3.091.569-3.891-.754-4.137-1.446-.138-.354-.738-1.446-1.261-1.738-.43-.23-1.046-.8-.016-.815.97-.015 1.661.892 1.892 1.261 1.107 1.86 2.876 1.338 3.584 1.015.107-.8.43-1.338.784-1.646-2.738-.307-5.598-1.368-5.598-6.074 0-1.338.477-2.446 1.26-3.307-.122-.308-.553-1.569.124-3.26 0 0 1.03-.323 3.383 1.26.985-.276 2.03-.415 3.076-.415 1.046 0 2.092.139 3.076.416 2.353-1.6 3.384-1.261 3.384-1.261.676 1.691.246 2.952.123 3.26.784.861 1.26 1.953 1.26 3.307 0 4.721-2.875 5.767-5.613 6.074.446.385.83 1.123.83 2.277 0 1.645-.015 2.968-.015 3.383 0 .323.231.708.846.584a12.324 12.324 0 0 0 8.382-11.672C24.607 5.506 19.101 0 12.304 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
