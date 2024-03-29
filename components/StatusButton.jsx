const StatusButton = ({ status }) => {
  return (
    <div className="bodyText font-bold capitalize">
      <p
        className={`${
          status === "draft"
            ? "text-[#373B53] dark:text-lightestGrey bg-[#373B53]/10 dark:bg-lightestGrey/10"
            : ""
        } ${status === "pending" ? "text-orange bg-orange/10" : ""} ${
          status === "paid" ? "text-green bg-green/10" : ""
        } rounded-[6px] flex items-center py-3 px-[17px]`}
      >
        <span
          className={`${
            status === "draft" ? "bg-[#373B53] dark:bg-lightestGrey" : ""
          } ${status === "pending" ? "bg-orange" : ""} ${
            status === "paid" ? "bg-green" : ""
          } w-2 h-2 rounded-full mr-2`}
        ></span>
        {status}
      </p>
    </div>
  );
};

export default StatusButton;
