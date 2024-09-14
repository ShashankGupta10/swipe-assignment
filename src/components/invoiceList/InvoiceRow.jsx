import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiCopy, BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Button from "../common/Button";
import InvoiceModal from "../InvoiceModal";
import { deleteInvoice } from "../../redux/invoicesSlice";
import DeleteModal from "./DeleteModal";

const InvoiceRow = ({ invoice, navigate, key }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <tr key={key}>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.billTo}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.dateOfIssue}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {invoice.currency} {invoice.total}
        </td>
        <td className="px-6 py-4 whitespace-nowrap flex justify-around">
          <Button onClick={() => navigate(`/edit/${invoice.id}`)}>
            <BiSolidPencil />
          </Button>
          <Button onClick={() => setIsOpen(true)}>
            <BsEyeFill />
          </Button>
          <Button onClick={() => navigate(`/create/${invoice.id}`)}>
            <BiCopy className="" />
          </Button>
          <Button className={'bg-red-600 hover:bg-red-500'} onClick={() => setIsDeleteModalOpen(invoice.id)}>
            <BiTrash />
          </Button>
        </td>
      </tr>
      <InvoiceModal
        showModal={isOpen}
        closeModal={() => setIsOpen(false)}
        info={invoice}
        items={invoice.items}
      />
      <DeleteModal id={isDeleteModalOpen} deleteInvoice={deleteInvoice} dispatch={dispatch} setIsDeleteModalOpen={setIsDeleteModalOpen} />
    </>
  );
};

export default InvoiceRow;
