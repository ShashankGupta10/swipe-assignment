import React from "react";
import { TbInvoice } from "react-icons/tb";
import { Link } from "react-router-dom";

const NoInvoices = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <TbInvoice className="mx-auto mb-4 w-32 h-32" />
      <h3 className="font-bold text-lg md:text-xl mb-4">
        No invoices available
      </h3>
      <p className="text-gray-500 mb-6 text-center">
        It looks like you haven&apos;t created any invoices yet.
      </p>
      <Link
        to="/create"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500"
      >
        Create Your First Invoice
      </Link>
    </div>
  );
};

export default NoInvoices;
