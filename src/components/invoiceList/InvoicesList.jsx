import InvoiceRow from "./InvoiceRow";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const InvoicesList = ({ invoiceList }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/create")}>Create Invoice</Button>
      </div>
      <table className="w-full table-auto text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="py-3 px-6">Invoice No.</th>
            <th className="py-3 px-6">Bill To</th>
            <th className="py-3 px-6">Due Date</th>
            <th className="py-3 px-6">Total Amt.</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoiceList.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              navigate={navigate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InvoicesList;
