import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "../redux/invoicesSlice";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useInvoiceListData } from "../redux/hooks";

import generateRandomId from "../utils/generateRandomId";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import BillingDetails from "./invoiceForm/BillingDetails";
import FinalDetails from "./invoiceForm/FinalDetails";
import DateAndId from "./invoiceForm/DateAndId";
import InvoiceSummary from "./invoiceForm/InvoiceSummary";
import Button from "./common/Button";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isCopy = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");

  const [isOpen, setIsOpen] = useState(false);
  const { getOneInvoice, listSize } = useInvoiceListData();
  const [formData, setFormData] = useState(
    isEdit
      ? getOneInvoice(params.id)
      : isCopy && params.id
      ? {
          ...getOneInvoice(params.id),
          id: generateRandomId(),
          invoiceNumber: listSize + 1,
        }
      : {
          id: generateRandomId(),
          currentDate: new Date().toLocaleDateString(),
          invoiceNumber: listSize + 1,
          dateOfIssue: "",
          billTo: "",
          billToEmail: "",
          billToAddress: "",
          billFrom: "",
          billFromEmail: "",
          billFromAddress: "",
          notes: "",
          total: "0.00",
          subTotal: "0.00",
          taxRate: "",
          taxAmount: "0.00",
          discountRate: "",
          discountAmount: "0.00",
          currency: "$",
          items: [
            {
              itemId: 0,
              itemName: "",
              itemDescription: "",
              itemPrice: "1.00",
              itemQuantity: 1,
            },
          ],
          products: [],
        }
  );

  useEffect(() => {
    handleCalculateTotal();
  }, [formData.items, formData.taxRate, formData.discountRate]);

  const handleRowDel = (itemToDelete) => {
    const updatedItems = formData.items.filter(
      (item) => item.itemId !== itemToDelete.itemId
    );
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddEvent = (product) => {
    const id = product.itemId || (new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      itemId: id,
      itemName: product.itemName || "",
      itemDescription: product.itemDescription || "",
      itemPrice: product.itemPrice || "1.00",
      itemQuantity: product.itemQuantity || 1,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;
    formData.items.forEach(
      (item) =>
        (subTotal += parseFloat(item.itemPrice) * parseInt(item.itemQuantity))
    );
    const taxAmount = (subTotal * (formData.taxRate / 100)).toFixed(2);
    const discountAmount = (subTotal * (formData.discountRate / 100)).toFixed(
      2
    );
    const total = (
      subTotal -
      parseFloat(discountAmount) +
      parseFloat(taxAmount)
    ).toFixed(2);

    setFormData({
      ...formData,
      subTotal: subTotal.toFixed(2),
      taxAmount,
      discountAmount,
      total,
    });
  };

  const onItemizedItemEdit = (evt, id) => {
    const updatedItems = formData.items.map((oldItem) => {
      if (oldItem.itemId === id)
        return { ...oldItem, [evt.target.name]: evt.target.value };
      return oldItem;
    });
    setFormData({ ...formData, items: updatedItems });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddInvoice = () => {
    if (isEdit) {
      dispatch(updateInvoice({ id: params.id, updatedInvoice: formData }));
      toast.success("Invoice updated successfully 🥳");
    } else {
      dispatch(addInvoice(formData));
      toast.success("Invoice added successfully 🥳");
    }
    navigate("/");
  };

  return (
    <form
      onSubmit={() => setIsOpen(true)}
      className="max-w-screen-xl md:m-4 m-2 p-4 border rounded-xl"
    >
      <Button onClick={() => navigate("/")}>
        <BiArrowBack size={18} />
        Go Back
      </Button>
      <div className="grid grid-cols-1 gap-4 py-6">
        <div className="md:col-span-6">
          <div className="bg-white flex flex-col gap-4">
            <DateAndId formData={formData} editField={handleChange} />
            <BillingDetails formData={formData} editField={handleChange} />
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowDel={handleRowDel}
              currency={formData.currency}
              items={formData.items}
              onRowAdd={handleAddEvent}
            />
            <FinalDetails formData={formData} editField={handleChange} />
            <InvoiceSummary
              formData={formData}
              handleAddInvoice={handleAddInvoice}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>

      <InvoiceModal
        showModal={isOpen}
        closeModal={setIsOpen}
        info={formData}
        items={formData.items}
        currency={formData.currency}
        subTotal={formData.subTotal}
        taxAmount={formData.taxAmount}
        discountAmount={formData.discountAmount}
        total={formData.total}
      />
    </form>
  );
};

export default InvoiceForm;
