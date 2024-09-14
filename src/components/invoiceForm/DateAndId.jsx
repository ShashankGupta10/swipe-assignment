import React from "react";

const DateAndId = ({ formData, editField }) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 items-center">
          <span className="font-medium">Current Date:&nbsp;</span>
          <input
            type="text"
            value={formData.currentDate}
            className="w-full md:w-auto px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg cursor-not-allowed"
            disabled
          />
        </div>
        <div className="grid grid-cols-2 items-center">
          <p className="font-medium">Due Date:</p>
          <input
            type="date"
            value={formData.dateOfIssue}
            name="dateOfIssue"
            onChange={editField}
            className="w-full md:w-auto px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <span className="font-medium">Invoice Number:&nbsp;</span>
        <input
          type="number"
          value={formData.invoiceNumber}
          name="invoiceNumber"
          onChange={editField}
          min="1"
          className="w-full md:w-auto px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
        />
      </div>
    </div>
  );
};

export default DateAndId;
