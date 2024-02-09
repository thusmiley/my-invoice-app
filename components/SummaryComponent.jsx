import React from "react";

const SummaryComponent = ({ invoice }) => {
  return (
    <div className="mt-10 md:mt-[52px]">
      <div className="bg-[#F9FAFE] p-6 rounded-t-[8px] space-y-6 md:p-8 md:space-y-0">
        {/* mobile */}
        {invoice?.items?.map((obj, index) => (
          <div
            key={index}
            className="flex justify-between items-center md:hidden"
          >
            <div>
              <h3 className="mb-2 headingText">{obj.name}</h3>
              <p className="bodyText font-bold">
                {obj.quantity} x $
                {obj.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <h4 className="headingText">
              $
              {obj.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h4>
          </div>
        ))}
        {/* tablet and desktop */}
        <div className="hidden md:block">
          <table className="table-fixed w-full">
            <thead className="">
              <tr className="text-[11px] leading-[18px] tracking-[-.23px] bodyText">
                <th className="text-left w-[50%] py-4">Item Name</th>
                <th className="text-center w-[10%] py-4">QTY.</th>
                <th className="text-right w-1/5 py-4">Price</th>
                <th className="text-right w-1/5 py-4">Total</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {invoice?.items?.map((obj, index) => (
                <tr key={index}>
                  <td className="mb-2 headingText text-left py-4">
                    {obj.name}
                  </td>
                  <td className="text-center text-lightGrey py-4">
                    {obj.quantity}
                  </td>
                  <td className="text-right text-lightGrey py-4">
                    $
                    {obj.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-right py-4">
                    $
                    {obj.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* amount due  */}
      <div className="bg-[#373B53] p-6 rounded-b-[8px] text-white flex justify-between items-center md:px-8">
        <p className="text-[11px] tracking-[-.23px] leading-[18px]">
          Amount Due
        </p>
        <h3 className="text-[20px] leading-[32px] tracking-[-.42px] font-bold md:text-[24px] md:leading-[32px] md:tracking-[-.5px]">
          $
          {invoice?.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>
    </div>
  );
};

export default SummaryComponent;
