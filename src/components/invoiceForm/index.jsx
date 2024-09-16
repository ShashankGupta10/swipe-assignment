import { useState, useEffect, useCallback, memo } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "./../../redux/invoicesSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useInvoiceListData } from "./../../redux/hooks";

import generateRandomId from "./../../utils/generateRandomId";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./../common/InvoiceModal";
import BillingDetails from "./BillingDetails";
import FinalDetails from "./FinalDetails";
import DateAndId from "./DateAndId";
import InvoiceSummary from "./InvoiceSummary";
import Button from "./../common/Button";

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
          items: [],
          products: [],
        }
  );

  useEffect(() => {
    handleCalculateTotal();
  }, [formData.items, formData.taxRate, formData.discountRate]);

  const handleRowDel = useCallback(
    (itemToDelete) => {
      const updatedItems = formData.items.filter(
        (item) => item.itemId !== itemToDelete.itemId
      );
      setFormData({ ...formData, items: updatedItems });
    },
    [formData.items]
  );

  const handleAddEvent = useCallback(
    (product) => {
      const id =
        product.itemId ||
        (new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const newItem = {
        itemId: id,
        itemName: product.itemName || "",
        itemDescription: product.itemDescription || "",
        itemPrice: product.itemPrice || "1.00",
        itemQuantity: product.itemQuantity || 1,
        itemImage: product.itemImage || "",
      };
      setFormData({
        ...formData,
        items: [...formData.items, newItem],
      });
    },
    [formData]
  );

  const handleCalculateTotal = useCallback(() => {
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
  }, [formData.items, formData.taxRate, formData.discountRate]);

  // const onItemizedItemEdit = useCallback((evt, id) => {
  //   console.log(evt, id);
  //   const updatedItems = formData.items.map((oldItem) => {
  //     console.log(oldItem.itemId, id);
  //     if (oldItem.itemId === id) {
  //       if (evt.target) return { ...oldItem, [evt.target.name]: evt.target.value };
  //       else return { ...oldItem, itemQuantity: oldItem.itemQuantity + 1 };
  //     }
  //     return oldItem;
  //   });
  //   setFormData({ ...formData, items: updatedItems });
  // }, [formData.items]);

  const updateQuantity = useCallback(
    (id, quantity) => {
      const updatedItems = formData.items.map((item) => {
        if (item.itemId === id) {
          return { ...item, itemQuantity: quantity };
        }
        return item;
      });
      setFormData({ ...formData, items: updatedItems });
    },
    [formData]
  );

  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, [formData]);

  const handleAddInvoice = useCallback(() => {
    if (isEdit) {
      dispatch(updateInvoice({ id: params.id, updatedInvoice: formData }));
      toast.success("Invoice updated successfully 🥳");
    } else {
      dispatch(addInvoice(formData));
      toast.success("Invoice added successfully 🥳");
    }
    navigate("/");
  }, [formData]);

  return (
    <form
      onSubmit={() => setIsOpen(true)}
      className="md:m-4 m-2 p-4 border rounded-xl"
    >
      <Button onClick={() => navigate("/")}>
        <BiArrowBack size={18} />
        Go Back
      </Button>
      <div className="grid grid-cols-1 gap-4 py-6">
        <div className="md:col-span-6">
          <div className="bg-white flex flex-col gap-4">
            <DateAndId
              currentDate={formData.currentDate}
              dateOfIssue={formData.dateOfIssue}
              invoiceNumber={formData.invoiceNumber}
              editField={handleChange}
            />
            <BillingDetails
              billTo={formData.billTo}
              billToEmail={formData.billToEmail}
              billToAddress={formData.billToAddress}
              billFrom={formData.billFrom}
              billFromEmail={formData.billFromEmail}
              billFromAddress={formData.billFromAddress}
              editField={handleChange}
            />
            <InvoiceItem
              // onItemizedItemEdit={onItemizedItemEdit}
              onRowDel={handleRowDel}
              currency={formData.currency}
              items={formData.items}
              onRowAdd={handleAddEvent}
              updateQuantity={updateQuantity}
            />
            <FinalDetails
              notes={formData.notes}
              taxRate={formData.taxRate}
              discountRate={formData.discountRate}
              currency={formData.currency}
              editField={handleChange}
            />
            <InvoiceSummary
              currency={formData.currency}
              subTotal={formData.subTotal}
              taxAmount={formData.taxAmount}
              discountAmount={formData.discountAmount}
              total={formData.total}
              handleAddInvoice={handleAddInvoice}
              setIsOpen={setIsOpen}
              isEdit={isEdit}
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
        taxAmount={formData.taxAmount}
        discountAmount={formData.discountAmount}
        total={formData.total}

      />
    </form>
  );
};

export default InvoiceForm;
