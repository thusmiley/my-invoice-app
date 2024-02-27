import Image from "next/image";
import plusIcon from "../public/icon-plus.svg";

const AddNewButton = ({ isAddInvoice, setIsAddInvoice }) => {
  return (
    <button
      className="bg-purple bodyText flex items-center p-[6px] ml-[18px] font-bold rounded-full hover:bg-lightPurple animation-effect md:p-2 md:ml-10"
      onClick={() => setIsAddInvoice(!isAddInvoice)}
    >
      <span className="bg-white rounded-full w-8 h-8 grid place-content-center">
        <Image
          src={plusIcon}
          height={10}
          width={10}
          alt=""
          className="w-[10px] h-auto object-contain object-center"
        />
      </span>
      <span className="mx-2 md:ml-2 text-white">New</span>
      <span className="hidden md:inline md:mr-2  text-white"> Invoice</span>
    </button>
  );
};

export default AddNewButton;
