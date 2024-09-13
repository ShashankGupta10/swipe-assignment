import React from "react";

const FinalDetails = ({ formData, editField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div>
        <label className="font-bold">Notes</label>
        <textarea
          placeholder="Notes - any relevant information not already covered"
          value={formData.notes}
          name="notes"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          rows="3"
          onChange={editField}
        ></textarea>
      </div>
      <div>
        <label className="font-bold">Discount (%)</label>
        <input
          placeholder="Enter discount"
          value={formData.discountRate}
          type="number"
          name="discountRate"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
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
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
        />
      </div>
    </div>
  );
};

export default FinalDetails;
