import React, { memo } from "react";
import Button from "../common/Button";
import { useSelector } from "react-redux";

const InvoiceSummary = ({ setIsOpen, handleAddInvoice, isEdit }) => {
  const { currency, subTotal, taxRate, discountRate } = useSelector(state => state.currentInvoice);
  return (
    <div className="text-right flex flex-col gap-4">
      <div>
        <p className="text-gray-800 text-xl font-medium">
          Subtotal: {currency} {subTotal}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Tax: {currency} {((Number(subTotal) * Number(taxRate)) / 100).toFixed(2)}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Discount: {currency} {((Number(subTotal) * Number(discountRate)) / 100).toFixed(2)}
        </p>
        <hr className="my-2 w-48 block ml-auto" />
        <h2 className="text-gray-800 text-xl font-bold">
          Total: {currency} {(Number(subTotal) + (Number(subTotal) * Number(taxRate)) / 100 - (Number(subTotal) * Number(discountRate)) / 100).toFixed(2)}
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
          {isEdit ? 'Edit Invoice': 'Add Invoice'}
        </Button>
      </div>
    </div>
  );
};

export default memo(InvoiceSummary);
