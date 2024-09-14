import React from "react";
import Button from "../common/Button";

const InvoiceSummary = ({ formData, handleAddInvoice, setIsOpen }) => {
  console.log(formData);
  return (
    <div className="text-right flex flex-col gap-4">
      <div>
        <p className="text-gray-800 text-xl font-medium">
          Subtotal: {formData.currency} {formData.subTotal}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Tax: {formData.currency} {formData.taxAmount}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Discount: {formData.currency} {formData.discountAmount}
        </p>
        <hr className="my-2 w-48 block ml-auto" />
        <h2 className="text-gray-800 text-xl font-bold">
          Total: {formData.currency} {formData.total}
        </h2>
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          type={"button"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Preview Invoice
        </Button>
        <Button
          onClick={handleAddInvoice}
          type={"button"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSummary;
