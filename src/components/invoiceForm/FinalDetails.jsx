import React from "react";

const FinalDetails = ({ formData, editField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <div className="col-span-3">
        <label className="font-bold">Notes</label>
        <textarea
          placeholder="Notes - any relevant information not already covered"
          value={formData.notes}
          name="notes"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          rows="5"
          onChange={editField}
        ></textarea>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-bold">Discount (%)</label>
          <input
            placeholder="Enter discount"
            value={formData.discountRate}
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
            value={formData.taxRate}
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

export default FinalDetails;
