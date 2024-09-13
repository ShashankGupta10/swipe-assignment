import React from "react";
import Button from "../common/Button";
const InvoiceSummary = ({ formData, handleAddInvoice }) => {
  return (
    <div className="text-right flex flex-col gap-4">
      <h2 className="text-gray-800 text-xl font-bold">
        Total: {formData.currency}
        {formData.total}
      </h2>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Preview Invoice
        </Button>
        <Button
          onClick={handleAddInvoice}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSummary;
