import Link from "next/link";

// export const metadata = {
//   title: "500",
// };

export default function Custom500() {
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <h1 className="my-20 text-xl md:text-4xl">
        500 - Server-side error occurred
      </h1>
      <Link href="/" passHref>
        <button className="w-full bg-purple font-bold text-white animation-effect rounded-full py-3 px-6 hover:bg-lightPurple flex items-center justify-center md:w-auto">
          Go home
        </button>
      </Link>
    </div>
  );
}
