import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCopy, BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Button from "../common/Button";
import InvoiceModal from "../common/InvoiceModal";
import { deleteInvoice } from "../../redux/invoicesSlice";
import DeleteModal from "./DeleteModal";
import { useGetProducts } from "../../redux/hooks";
// import { currencyMap } from "../../utils/currencyMap";

const InvoiceRow = ({ invoice, navigate, key }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [total, setTotal] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { products } = useGetProducts();
  // const currency = useSelector((state) => state.currentInvoice.currency);

  // useEffect(async () => {
  //   const total = await handleCalculateTotal();
  //   setTotal(total);
  // }, [invoice.items, invoice.taxAmount, invoice.discountAmount]);


  // const handleCalculateTotal = async () => {
  //   let total = 0;
  //   const isCurrencySame = invoice.currency === currency;
  //   if (isCurrencySame) {
  //     invoice.items.forEach((item) => {
  //       const product = products.find((p) => p.id === item.id);
  //       total += product.productPrice * item.quantity;
  //     });
  //     total += Number(invoice.taxAmount);
  //     total -= Number(invoice.discountAmount);
  //     return total;
  //   } else {
  //     const response = await fetch(
  //       `https://api.freecurrencyapi.com/v1/latest?base_currency=${currencyMap[currency]}&currencies=${currencyMap[invoice.currency]}&apikey=fca_live_Vgab5S9zZ9wLi7DuX40hZ5KMhZ5Vn8oIxvb5WJq6`
  //     );
  //     const data = await response.json();
  //     const currencyVal = data.data[currencyMap[invoice.currency]];
  //     console.log(currencyVal);
  //     invoice.items.forEach((item) => {
  //       const product = products.find((p) => p.id === item.id);
  //       const convertedPrice = (product.productPrice * currencyVal).toFixed(2);
  //       total += convertedPrice * item.quantity;
  //     });
  //     total += Number(invoice.taxAmount);
  //     total -= Number(invoice.discountAmount);
  //     return total;
  //   }
  // };

  const handleCalculateTotal = () => {
    let total = 0;
    invoice.items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      total += product.productPrice * item.quantity;
    });
    // console.log(typeof info.taxAmount, typeof info.discountAmount, typeof total);
    total += Number(invoice.taxAmount);
    total -= Number(invoice.discountAmount);
    return total;
  };



  // console.log(total);

  return (
    <>
      <tr key={key}>
        <td className="p-2 text-nowrap whitespace-nowrap">{invoice.id}</td>
        <td className="p-2 text-nowrap whitespace-nowrap">{invoice.billTo}</td>
        <td className="p-2 text-nowrap whitespace-nowrap">
          {invoice.dateOfIssue}
        </td>
        <td className="p-2 text-nowrap whitespace-nowrap">
          {invoice.currency} {handleCalculateTotal().toFixed(2)}
        </td>
        <td className="p-2 min-w-64 text-nowrap grid grid-cols-4 gap-2 items-center whitespace-nowrap">
          <Button
            className={""}
            onClick={() => navigate(`/edit/${invoice.id}`)}
          >
            <BiSolidPencil />
          </Button>
          <Button className={""} onClick={() => setIsOpen(true)}>
            <BsEyeFill />
          </Button>
          <Button
            className={""}
            onClick={() => navigate(`/create/${invoice.id}`)}
          >
            <BiCopy className="" />
          </Button>
          <Button
            className={"bg-red-600 hover:bg-red-500"}
            onClick={() => setIsDeleteModalOpen(invoice.id)}
          >
            <BiTrash />
          </Button>
        </td>
      </tr>
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
