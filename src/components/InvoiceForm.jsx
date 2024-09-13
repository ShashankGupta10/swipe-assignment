import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "../redux/invoicesSlice";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import generateRandomId from "../utils/generateRandomId";
import { useInvoiceListData } from "../redux/hooks";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { toast } from "react-toastify";
import Button from "./common/Button";
import ProductsTab from "./ProductsTab"; // Import for new Products tab

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
          products: [], // Initialize products array for Products tab
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

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      itemId: id,
      itemName: "",
      itemDescription: "",
      itemPrice: "1.00",
      itemQuantity: 1,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;
    formData.items.forEach((item) => {
      subTotal +=
        parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
    });

    const taxAmount = (
      subTotal * (formData.taxRate / 100)
    ).toFixed(2);
    const discountAmount = (
      subTotal * (formData.discountRate / 100)
    ).toFixed(2);
    const total = (
      subTotal - parseFloat(discountAmount) + parseFloat(taxAmount)
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
      if (oldItem.itemId === id) {
        return { ...oldItem, [evt.target.name]: evt.target.value };
      }
      return oldItem;
    });
    setFormData({ ...formData, items: updatedItems });
  };

  const editField = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

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
    <form onSubmit={openModal}>
      <div className="flex items-center">
        <BiArrowBack size={18} />
        <div className="font-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <div className="md:col-span-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between mb-4">
              <div>
                <div className="mb-2">
                  <span className="font-bold">Current Date:&nbsp;</span>
                  <span>{formData.currentDate}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">Due Date:</span>
                  <input
                    type="date"
                    value={formData.dateOfIssue}
                    name="dateOfIssue"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    className="border border-gray-300 rounded p-2 w-48"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Invoice Number:&nbsp;</span>
                <input
                  type="number"
                  value={formData.invoiceNumber}
                  name="invoiceNumber"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  min="1"
                  className="border border-gray-300 rounded p-2 w-20"
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-bold">Bill to:</label>
                <input
                  placeholder="Who is this invoice to?"
                  value={formData.billTo}
                  type="text"
                  name="billTo"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
                <input
                  placeholder="Email address"
                  value={formData.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
                <input
                  placeholder="Billing address"
                  value={formData.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
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
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
                <input
                  placeholder="Email address"
                  value={formData.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
                <input
                  placeholder="Billing address"
                  value={formData.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            {/* Product Tab */}
            {/* <ProductsTab products={formData.products} setFormData={setFormData} /> */}

            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowDel={handleRowDel}
              onAddEvent={handleAddEvent}
              currency={formData.currency}
              items={formData.items}
              onRowAdd={handleAddEvent}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <label className="font-bold">Notes</label>
                <textarea
                  placeholder="Notes - any relevant information not already covered"
                  value={formData.notes}
                  name="notes"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  rows="3"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="font-bold">Discount (%)</label>
                <input
                  placeholder="Enter discount"
                  value={formData.discountRate}
                  type="number"
                  name="discountRate"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                />
              </div>
              <div>
                <label className="font-bold">Tax (%)</label>
                <input
                  placeholder="Enter tax"
                  value={formData.taxRate}
                  type="number"
                  name="taxRate"
                  className="border border-gray-300 rounded p-2 mt-2 w-full"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="text-right">
              <h2 className="text-gray-800 text-xl font-bold">
                Total: {formData.currency}
                {formData.total}
              </h2>
              <Button
                onClick={openModal}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Preview Invoice
              </Button>
              <Button
                onClick={handleAddInvoice}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Invoice
              </Button>
            </div>
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
        taxAmmount={formData.taxAmount}
        discountAmmount={formData.discountAmount}
        total={formData.total}
      />
    </form>
  );
};

export default InvoiceForm;
