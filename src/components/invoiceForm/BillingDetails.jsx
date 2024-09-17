import { useSelector, useDispatch } from "react-redux";
import { updateCurrentInvoice } from "../../redux/currentInvoiceSlice";

const BillingDetails = () => {
  const dispatch = useDispatch();
  const { billTo, billToEmail, billToAddress, billFrom, billFromEmail, billFromAddress } = useSelector(state => state.currentInvoice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl p-4 border">
      <div>
        <label className="font-medium">Bill to:</label>
        <input
          placeholder="Who is this invoice to?"
          value={billTo}
          type="text"
          name="billTo"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billTo: e.target.value }))}
          required
        />
        <input
          placeholder="Email address"
          value={billToEmail}
          type="email"
          name="billToEmail"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billToEmail: e.target.value }))}
          required
        />
        <input
          placeholder="Billing address"
          value={billToAddress}
          type="text"
          name="billToAddress"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billToAddress: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="font-medium">Bill from:</label>
        <input
          placeholder="Who is this invoice from?"
          value={billFrom}
          type="text"
          name="billFrom"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billFrom: e.target.value }))}
          required
        />
        <input
          placeholder="Email address"
          value={billFromEmail}
          type="email"
          name="billFromEmail"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billFromEmail: e.target.value }))}
          required
        />
        <input
          placeholder="Billing address"
          value={billFromAddress}
          type="text"
          name="billFromAddress"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={(e) => dispatch(updateCurrentInvoice({ billFromAddress: e.target.value }))}
          required
        />
      </div>
    </div>
  );
};

export default BillingDetails;
