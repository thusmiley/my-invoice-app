import Image from "next/image";
import plusIcon from "../public/icon-plus.svg";

const AddNewButton = () => {
  return (
    <button className="bg-purple text-white bodyText flex items-center p-[6px] rounded-full hover:bg-lightPurple transition-all duration-200 ease-in-out md:p-2">
      <span className="bg-white rounded-full w-8 h-8 grid place-content-center">
        <Image
          src={plusIcon}
          height={10}
          width={10}
          alt=""
          className="w-[10px] h-auto object-contain object-center"
        />
      </span>
      <span className="mx-2 md:ml-2">New</span>
      <span className="hidden md:inline md:mr-2"> Invoice</span>
    </button>
  );
};

export default AddNewButton;
