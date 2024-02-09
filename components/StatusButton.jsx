const StatusButton = ({ status }) => {
  return (
    <div className="py-3 px-[17px] bg-orange/10 rounded-[6px] bodyText font-bold text-orange flex items-center capitalize">
      <span className="w-2 h-2 rounded-full bg-orange mr-2"></span>{" "}
      {status}
    </div>
  );
};

export default StatusButton