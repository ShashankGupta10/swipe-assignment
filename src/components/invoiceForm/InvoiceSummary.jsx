import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, updateInvoice } from "../../redux/invoicesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { invoiceSchema } from "../../utils/invoiceSchema";

const InvoiceSummary = ({ setIsOpen, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.currentInvoice);
  const { conversionRate } = useSelector((state) => state.currency);

  const handleAddInvoice = () => {  
    if (isEdit) {
      const { success, data, error } = invoiceSchema.safeParse(formData);
      if (!success) {
        toast.error(`Failed to update invoice: ${error.issues?.[0]?.message || "An error occurred"}`);
        return;
      }
      dispatch(updateInvoice({ id: data.id, updatedInvoice: data }));
      navigate("/");
    } else {
      const { success, data, error } = invoiceSchema.safeParse(formData);
      if (!success) {
        toast.error(`Failed to add invoice: ${error.issues?.[0]?.message || "An error occurred"}`);
        return;
      }
      dispatch(addInvoice(data));
      navigate("/");
    }
  };

  return (
    <div className="text-right flex flex-col gap-4">
      <div>
        <p className="text-gray-800 text-xl font-medium">
          Subtotal: {formData.currency} {Number(formData.subTotal * conversionRate).toFixed(2)}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Tax: {formData.currency}{" "}
          {(
            (Number(formData.subTotal * conversionRate) * Number(formData.taxRate)) /
            100
          ).toFixed(2)}
        </p>
        <p className="text-gray-800 text-xl font-medium">
          Discount: {formData.currency}{" "}
          {(
            (Number(formData.subTotal * conversionRate) * Number(formData.discountRate)) /
            100
          ).toFixed(2)}
        </p>
        <hr className="my-2 w-48 block ml-auto" />
        <h2 className="text-gray-800 text-xl font-medium">
          Total: {formData.currency} {Number(formData.total * conversionRate).toFixed(2)}
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
