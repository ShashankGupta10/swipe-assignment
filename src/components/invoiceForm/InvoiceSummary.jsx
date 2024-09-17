import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, updateInvoice } from "../../redux/invoicesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InvoiceSummary = ({ setIsOpen, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currency, subTotal, taxRate, discountRate, total } = useSelector(
    (state) => state.currentInvoice
  );
  const formData = useSelector((state) => state.currentInvoice);
  const { conversionRate } = useSelector((state) => state.currency);

  const handleAddInvoice = () => {
    if (isEdit) {
      dispatch(updateInvoice({ id: formData.id, updatedInvoice: formData }));
      toast.success("Invoice updated successfully 🥳");
    } else {
      dispatch(addInvoice(formData));
      toast.success("Invoice added successfully 🥳");
    }
    navigate("/");
  };

  return (
    <div className="text-right flex flex-col gap-4">
      <div>
        <p className="text-gray-800 text-xl font-medium">
          Subtotal: {currency} {Number(subTotal).toFixed(2)}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Tax: {currency}{" "}
          {(
            (Number(subTotal) * Number(taxRate)) /
            100
          ).toFixed(2)}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Discount: {currency}{" "}
          {(
            (Number(subTotal * conversionRate) * Number(discountRate)) /
            100
          ).toFixed(2)}
        </p>
        <hr className="my-2 w-48 block ml-auto" />
        <h2 className="text-gray-800 text-xl font-bold">
          Total: {currency} {Number(total).toFixed(2)}
        </h2>
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          type={"button"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Preview Invoice
        </Button>
        <Button
          onClick={handleAddInvoice}
          type={"button"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEdit ? "Edit Invoice" : "Add Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSummary;
