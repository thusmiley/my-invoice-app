const StatusButton = ({ status }) => {
  return (
      <div className="bodyText font-bold capitalize">
          <p className="rounded-[6px] flex items-center py-3 px-[17px] text-orange bg-orange/10 "><span className="w-2 h-2 rounded-full bg-orange mr-2"></span>{" "}
      {status}</p>
      
    </div>
  );
};

export default StatusButton