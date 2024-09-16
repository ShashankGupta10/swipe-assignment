import React from "react";
import InvoiceForm from "../components/invoiceForm";
import ProductsTab from "../components/products/ProductsTab";

const Invoice = () => {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="lg:col-span-2 col-span-3 lg:mr-6">
        <InvoiceForm />
      </div>
      <ProductsTab />
    </div>
  );
};

export default Invoice;
