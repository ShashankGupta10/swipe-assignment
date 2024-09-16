import { useState, useEffect, useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, updateInvoice } from "./../../redux/invoicesSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProducts, useInvoiceListData } from "./../../redux/hooks";

import generateRandomId from "./../../utils/generateRandomId";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./../common/InvoiceModal";
import BillingDetails from "./BillingDetails";
import FinalDetails from "./FinalDetails";
import DateAndId from "./DateAndId";
import InvoiceSummary from "./InvoiceSummary";
import Button from "./../common/Button";
import {
  initializeCurrentInvoice,
  updateCurrentInvoice,
} from "../../redux/currentInvoiceSlice";
import { updateProduct } from "../../redux/productsSlice";
import { currencyMap } from "../../utils/currencyMap";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isCopy = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");
  const data = useGetProducts();
  const formData = useSelector((state) => state.currentInvoice);
  const products = useSelector((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const { getOneInvoice, listSize } = useInvoiceListData();

  useEffect(() => {
    if (isEdit) {
      const invoice = getOneInvoice(params.id);
      console.log(invoice);
      dispatch(updateCurrentInvoice(invoice));
    } else if (isCopy && params.id) {
      const invoice = getOneInvoice(params.id);
      dispatch(
        updateCurrentInvoice({
          ...invoice,
          id: generateRandomId(),
          invoiceNumber: listSize + 1,
        })
      );
    } else {
      dispatch(initializeCurrentInvoice({ invoiceNumber: listSize + 1 }));
    }
  }, [params.id]);

  useEffect(() => {
    handleCalculateTotal();
  }, [formData.items, formData.taxRate, formData.discountRate, data.products]);

  const handleRowDel = useCallback(
    (itemToDelete) => {
      const updatedItems = formData.items.filter(
        (item) => item.id !== itemToDelete
      );
      dispatch(updateCurrentInvoice({ items: updatedItems }));
    },
    [formData.items]
  );

  const handleAddEvent = useCallback(
    (itemId) => {
      dispatch(
        updateCurrentInvoice({
          items: [...formData.items, { id: itemId, quantity: 1 }],
        })
      );
    },
    [formData]
  );

  const handleCalculateTotal = () => {
    let subTotal = 0;
    formData.items.forEach((item) => {
      const product = data.products.find((p) => p.id === item.id);
      subTotal += product.productPrice * item.quantity;
    });
    const taxAmount = (subTotal * (formData.taxRate / 100)).toFixed(2);
    const discountAmount = (subTotal * (formData.discountRate / 100)).toFixed(
      2
    );
    const total = (
      subTotal -
      parseFloat(discountAmount) +
      parseFloat(taxAmount)
    ).toFixed(2);

    dispatch(
      updateCurrentInvoice({
        subTotal: subTotal.toFixed(2),
        taxAmount,
        discountAmount,
        total,
      })
    );
  };

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
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      dispatch(updateCurrentInvoice({ items: updatedItems }));
    },
    [formData]
  );

  const handleChange = useCallback(
    async (e) => {
      dispatch(
        updateCurrentInvoice({
          ...formData,
          [e.target.name]: e.target.value,
        })
      );

      if (e.target.name === "currency") {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?base_currency=${currencyMap[formData.currency]}&currencies=${currencyMap[e.target.value]}&apikey=fca_live_Vgab5S9zZ9wLi7DuX40hZ5KMhZ5Vn8oIxvb5WJq6`)
        const data = await response.json();
        console.log(data.data, e.target.name, currencyMap[e.target.value]);
        const currencyVal = data.data[currencyMap[e.target.value]];
        products.products.forEach((product) => {
          const price = product.productPrice;
          console.log(typeof price, typeof currencyVal);
          const convertedPrice = (Number(price) * currencyVal).toFixed(2);
          dispatch(updateProduct({ id: product.id, updatedProduct: { productPrice: convertedPrice } }));
        });
      }
    },
    [formData]
  );

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
            <DateAndId editField={handleChange} />
            <BillingDetails editField={handleChange} />
            <InvoiceItem
              onRowDel={handleRowDel}
              onRowAdd={handleAddEvent}
              updateQuantity={updateQuantity}
            />
            <FinalDetails editField={handleChange} />
            <InvoiceSummary
              handleAddInvoice={handleAddInvoice}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>

      <InvoiceModal
        showModal={isOpen}
        closeModal={setIsOpen}
        // invoiceId={formData}
        // total={formData.total}
      />
    </form>
  );
};

export default InvoiceForm;
