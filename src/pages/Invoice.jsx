import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import ProductsTab from "../components/products/ProductsTab";

const Invoice = () => {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="col-span-2">
        <InvoiceForm />
      </div>
      <ProductsTab />
    </div>
  );
};

export default Invoice;
