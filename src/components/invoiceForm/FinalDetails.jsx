import { useSelector, useDispatch } from "react-redux";
import { updateCurrentInvoice } from "../../redux/currentInvoiceSlice";

const FinalDetails = () => {
  const dispatch = useDispatch();
  const { notes, currency, discountRate, taxRate } = useSelector(state => state.currentInvoice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl p-4 border">
      <div className="col-span-3">
        <label className="font-medium">Notes</label>
        <textarea
          placeholder="Notes - any relevant information not already covered"
          value={notes}
          name="notes"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          rows="9"
          onChange={(e) => dispatch(updateCurrentInvoice({ notes: e.target.value }))}
        ></textarea>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium">Currency</label>
          <select
            placeholder="Currency"
            value={currency || "USD"}
            name="currency"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={(e) => dispatch(updateCurrentInvoice({ currency: e.target.value }))}
          >
            <option value="$">US Dollar</option>
            <option value="₹">Indian Rupee</option>
            <option value="£">British Pound</option>
            <option value="€">Euro</option>
            <option value="¥">Japanese Yen</option>
            <option value="₽">Russian Ruble</option>
            <option value="₩">South Korean Won</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Discount (%)</label>
          <input
            placeholder="Enter discount"
            value={discountRate}
            type="number"
            name="discountRate"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={(e) => dispatch(updateCurrentInvoice({ discountRate: e.target.value }))}
          />
        </div>
        <div>
          <label className="font-medium">Tax (%)</label>
          <input
            placeholder="Enter tax"
            value={taxRate}
            type="number"
            name="taxRate"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={(e) => dispatch(updateCurrentInvoice({ taxRate: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalDetails;
