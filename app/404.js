import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      {/* <Head>
        <title>404 - Not Found | My Invoice App</title>
      </Head> */}
      <h1 className="my-20 text-xl md:text-4xl">404 - Page Not Found</h1>
      <Link href="/" passHref>
        <button className="w-full bg-purple font-bold text-white animation-effect rounded-full py-3 px-6 hover:bg-lightPurple flex items-center justify-center md:w-auto">
          Go home
        </button>
      </Link>
    </div>
  );
}
