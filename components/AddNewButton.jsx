
const AddNewButton = ({ isAddInvoice, setIsAddInvoice }) => {
  return (
    <button
      className="bg-purple bodyText flex items-center p-[6px] ml-[18px] font-bold rounded-full hover:bg-lightPurple animation-effect md:p-2 md:ml-10"
      onClick={() => setIsAddInvoice(!isAddInvoice)}
    >
      <span className="bg-white rounded-full w-8 h-8 grid place-content-center">
        <img
          src='/icon-plus.svg'
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
