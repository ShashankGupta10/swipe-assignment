import React from "react";

const BillingDetails = ({ formData, editField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl p-4 border">
      <div>
        <label className="font-medium">Bill to:</label>
        <input
          placeholder="Who is this invoice to?"
          value={formData.billTo}
          type="text"
          name="billTo"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
        <input
          placeholder="Email address"
          value={formData.billToEmail}
          type="email"
          name="billToEmail"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
        <input
          placeholder="Billing address"
          value={formData.billToAddress}
          type="text"
          name="billToAddress"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
      </div>
      <div>
        <label className="font-medium">Bill from:</label>
        <input
          placeholder="Who is this invoice from?"
          value={formData.billFrom}
          type="text"
          name="billFrom"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
        <input
          placeholder="Email address"
          value={formData.billFromEmail}
          type="email"
          name="billFromEmail"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
        <input
          placeholder="Billing address"
          value={formData.billFromAddress}
          type="text"
          name="billFromAddress"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={editField}
          required
        />
      </div>
    </div>
  );
};

export default BillingDetails;
