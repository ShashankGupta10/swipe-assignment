import React, { memo } from "react";
import { useSelector } from "react-redux";

const FinalDetails = ({ editField }) => {
  const { notes, currency, discountRate, taxRate} = useSelector(state => state.currentInvoice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl p-4 border">
      <div className="col-span-3">
        <label className="font-bold">Notes</label>
        <textarea
          placeholder="Notes - any relevant information not already covered"
          value={notes}
          name="notes"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          rows="9"
          onChange={editField}
        ></textarea>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-bold">Currency</label>
          <select
            placeholder="Currency"
            value={currency || "USD"}
            name="currency"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={editField}
          >
            <option value="$">US Dollar</option>
            <option value="₹">Indian Rupee</option>
            <option value="£">British Pound</option>
            <option value="€">Euro</option>
            <option value="¥">Japanese Yen</option>
            <option value="₽">Russian Ruble</option>
            <option value="₩">South Korean Won</option>
            <option value="¥">Chinese Yuan (Renminbi)</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Discount (%)</label>
          <input
            placeholder="Enter discount"
            value={discountRate}
            type="number"
            name="discountRate"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={editField}
          />
        </div>
        <div>
          <label className="font-bold">Tax (%)</label>
          <input
            placeholder="Enter tax"
            value={taxRate}
            type="number"
            name="taxRate"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={editField}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(FinalDetails);
