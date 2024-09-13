import React from "react";

const DateAndId = ({ formData, editField }) => {
  return (
    <div className="w-full flex justify-between mb-4">
      <div>
        <div className="mb-2">
          <span className="font-bold">Current Date:&nbsp;</span>
          <span>{formData.currentDate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-2">Due Date:</span>
          <input
            type="date"
            value={formData.dateOfIssue}
            name="dateOfIssue"
            onChange={editField}
            className="border border-gray-300 rounded p-2 w-48"
            required
          />
        </div>
      </div>
      <div className="flex items-center">
        <span className="font-bold mr-2">Invoice Number:&nbsp;</span>
        <input
          type="number"
          value={formData.invoiceNumber}
          name="invoiceNumber"
          onChange={editField}
          min="1"
          className="border border-gray-300 rounded p-2 w-20"
          required
        />
      </div>
    </div>
  );
};

export default DateAndId;
