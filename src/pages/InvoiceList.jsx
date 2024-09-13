import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import { TbInvoice } from "react-icons/tb";

// import emptyIllustration from "../assets/empty-illustration.png"; // Example placeholder

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const navigate = useNavigate();

  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      toast.error("Please enter a valid invoice ID.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h3 className="font-bold text-lg md:text-xl">Invoice Dashboard</h3>
      </div>
      <div className="bg-white shadow-xl rounded-xl p-6">
        {isListEmpty ? (
          <div className="text-center py-12">
            <TbInvoice className="mx-auto mb-4 w-32 h-32" />
            <h3 className="font-bold text-lg md:text-xl mb-4">
              No invoices available
            </h3>
            <p className="text-gray-500 mb-6">
              It looks like you haven&apos;t created any invoices yet.
            </p>
            <Link to="/create">
              <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600">
                Create Your First Invoice
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Invoice List</h3>
              <Link
                to="/create"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600"
              >
                Create Invoice
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-gray-800 text-white px-4 py-2 rounded shadow"
                  onClick={handleCopyClick}
                >
                  Copy Invoice
                </Button>
                <input
                  type="text"
                  value={copyId}
                  onChange={(e) => setCopyId(e.target.value)}
                  placeholder="Enter Invoice ID to copy"
                  className="border p-2 rounded w-64"
                />
              </div>
            </div>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Invoice No.</th>
                  <th className="border px-4 py-2">Bill To</th>
                  <th className="border px-4 py-2">Due Date</th>
                  <th className="border px-4 py-2">Total Amt.</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
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
        )}
      </div>
    </div>
  );
};

const InvoiceRow = ({ invoice, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
      <td className="border px-4 py-2">{invoice.billTo}</td>
      <td className="border px-4 py-2">{invoice.dateOfIssue}</td>
      <td className="border px-4 py-2">
        {invoice.currency}
        {invoice.total}
      </td>
      <td className="border px-4 py-2 flex gap-2">
        <Button
          className="bg-blue-500 text-white p-2 rounded shadow"
          onClick={handleEditClick}
        >
          <BiSolidPencil />
        </Button>
        <Button
          className="bg-red-500 text-white p-2 rounded shadow"
          onClick={() => handleDeleteClick(invoice.id)}
        >
          <BiTrash />
        </Button>
        <Button
          className="bg-gray-500 text-white p-2 rounded shadow"
          onClick={openModal}
        >
          <BsEyeFill />
        </Button>
        <InvoiceModal
          showModal={isOpen}
          closeModal={closeModal}
          info={invoice}
          items={invoice.items}
        />
      </td>
    </tr>
  );
};

export default InvoiceList;
