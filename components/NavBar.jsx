import Image from "next/image";
import Link from "next/link";
import moonIcon from "../public/icon-moon.svg";
import sunIcon from "../public/icon-sun.svg";
import avatar from "../public/image-avatar.jpg";

const NavBar = () => {
  return (
    <nav className="bg-[#373B53] flex justify-between items-center">
      <Link href="/">
        <svg
          className="h-[72px] w-auto object-cover object-center"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.486 23.0003L36 35.8995L42.514 23.0003C46.9652 25.3092 50 29.9105 50 35.21C50 42.8261 43.732 49.0002 36 49.0002C28.268 49.0002 22 42.8261 22 35.21C22 29.9105 25.0348 25.3092 29.486 23.0003Z"
            fill="white"
          />
        </svg>
      </Link>

      <div className="flex justify-end items-center mr-6">
        <Image
          src={moonIcon}
          width={20}
          height={20}
          alt="toggle dark mode"
          className="w-5 h-auto object-contain object-center"
        />
        <div className="w-[1px] h-[72px] bg-[#494E6E] mx-6" />
        <Image
          src={avatar}
          width={32}
          height={32}
          alt="toggle dark mode"
          className="w-8 h-auto object-cover object-center rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
