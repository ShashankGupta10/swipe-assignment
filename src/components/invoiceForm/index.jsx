import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
import { currencyMap } from "../../utils/currencyMap";
import { getCurrencyRates, setTargetCurrency } from "../../redux/currencySlice";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isCopy = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");
  const formData = useSelector((state) => state.currentInvoice);
  const { products } = useGetProducts();

  const [isOpen, setIsOpen] = useState(false);
  const { getOneInvoice, listSize } = useInvoiceListData();

  // Calculate total and subTotal for all the items in the invoice
  const handleCalculateTotal = () => {
    let subTotalValue = 0;
    formData.items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      subTotalValue += product.productPrice * item.quantity;
    });

    const totalValue = subTotalValue +
      (Number(formData.taxRate) * Number(subTotalValue)) / 100 -
      (Number(formData.discountRate) * Number(subTotalValue)) / 100;
    return { subTotalValue, totalValue };
  };

  // Initialize the current Invouce based on the route and params
  useEffect(() => {
    if (isEdit) {
      const invoice = getOneInvoice(params.id);
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

  // Handle the currency change and update the currency rates
  useEffect(() => {
    dispatch(setTargetCurrency(currencyMap[formData.currency]));
    dispatch(getCurrencyRates(currencyMap[formData.currency]));
  }, [products, formData]);

  // Update the total and subTotal values based on the items, taxRate, discountRate and currency
  useEffect(() => {
    dispatch(
      updateCurrentInvoice({
        total: handleCalculateTotal().totalValue.toFixed(2),
        subTotal: handleCalculateTotal().subTotalValue.toFixed(2),
      })
    );
  }, [formData.items, formData.taxRate, formData.discountRate, products, formData.currency]);

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
            <DateAndId />
            <BillingDetails />
            <InvoiceItem />
            <FinalDetails />
            <InvoiceSummary
              setIsOpen={setIsOpen}
              isEdit={isEdit}
            />
          </div>
        </div>
      </div>

      <InvoiceModal showModal={isOpen} closeModal={setIsOpen} />
    </form>
  );
};

export default InvoiceForm;
