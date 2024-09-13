import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiCopy, BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Button from "../common/Button";
import InvoiceModal from "../InvoiceModal";
import { deleteInvoice } from "../../redux/invoicesSlice";

const InvoiceRow = ({ invoice, navigate, key }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          <Button onClick={() => dispatch(deleteInvoice(invoice.id))}>
            <BiTrash />
          </Button>
          <Button onClick={() => setIsOpen(true)}>
            <BsEyeFill />
          </Button>
          <Button onClick={() => navigate(`/create/${invoice.id}`)}>
            <BiCopy className="" />
          </Button>
        </td>
      </tr>
      <InvoiceModal
        showModal={isOpen}
        closeModal={() => setIsOpen(false)}
        info={invoice}
        items={invoice.items}
      />
    </>
  );
};

export default InvoiceRow;
