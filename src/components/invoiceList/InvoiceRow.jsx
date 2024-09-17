import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCopy, BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { deleteInvoice } from "../../redux/invoicesSlice";
import Button from "../common/Button";
import InvoiceModal from "../common/InvoiceModal";
import DeleteModal from "./DeleteModal";

const InvoiceRow = ({ invoice, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.currentInvoice);

  return (
    <>
      <tr>
        <td className="p-2 text-nowrap whitespace-nowrap">{invoice.id}</td>
        <td className="p-2 text-nowrap whitespace-nowrap">{invoice.billTo}</td>
        <td className="p-2 text-nowrap whitespace-nowrap">
          {invoice.dateOfIssue}
        </td>
        <td className="p-2 text-nowrap whitespace-nowrap">
          {invoice.currency} {Number(total).toFixed(2)}
        </td>
        <td className="p-2 min-w-64 text-nowrap grid grid-cols-4 gap-2 items-center whitespace-nowrap">
          <Button onClick={() => navigate(`/edit/${invoice.id}`)}>
            <BiSolidPencil />
          </Button>
          <Button onClick={() => setIsOpen(true)}>
            <BsEyeFill />
          </Button>
          <Button onClick={() => navigate(`/create/${invoice.id}`)}>
            <BiCopy />
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={() => setIsDeleteModalOpen(invoice.id)}
          >
            <BiTrash />
          </Button>
        </td>
      </tr>
      {/* Modals */}
      <InvoiceModal
        showModal={isOpen}
        closeModal={() => setIsOpen(false)}
        invoiceId={invoice.id}
        currency={invoice.currency}
      />
      <DeleteModal
        id={isDeleteModalOpen}
        deleteInvoice={deleteInvoice}
        dispatch={dispatch}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  );
};

export default InvoiceRow;
