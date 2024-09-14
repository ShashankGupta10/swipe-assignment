import InvoiceRow from "./InvoiceRow";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const InvoicesList = ({ invoiceList }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/create")}>Create Invoice</Button>
      </div>
      <div className="max-w-screen-xl overflow-x-auto">
        <table className="w-full table-auto text-xs md:text-base text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b rounded-xl">
            <tr>
              <th className="p-2 text-nowrap">Inv No.</th>
              <th className="p-2 text-nowrap">Bill To</th>
              <th className="p-2 text-nowrap">Due Date</th>
              <th className="p-2 text-nowrap">Total Amt.</th>
              <th className="p-2 text-nowrap">Actions</th>
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
      </div>
    </div>
  );
};

export default InvoicesList;
