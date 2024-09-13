import React from "react";

const BillingDetails = ({ formData, editField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-bold">Bill to:</label>
        <input
          placeholder="Who is this invoice to?"
          value={formData.billTo}
          type="text"
          name="billTo"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
        <input
          placeholder="Email address"
          value={formData.billToEmail}
          type="email"
          name="billToEmail"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
        <input
          placeholder="Billing address"
          value={formData.billToAddress}
          type="text"
          name="billToAddress"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
      </div>
      <div>
        <label className="font-bold">Bill from:</label>
        <input
          placeholder="Who is this invoice from?"
          value={formData.billFrom}
          type="text"
          name="billFrom"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
        <input
          placeholder="Email address"
          value={formData.billFromEmail}
          type="email"
          name="billFromEmail"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
        <input
          placeholder="Billing address"
          value={formData.billFromAddress}
          type="text"
          name="billFromAddress"
          className="border border-gray-300 rounded p-2 mt-2 w-full"
          onChange={editField}
          required
        />
      </div>
    </div>
  );
};

export default BillingDetails;
