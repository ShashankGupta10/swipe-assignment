import { useInvoiceListData } from "../redux/hooks";
import NoInvoices from "../components/invoiceList/NoInvoices";
import InvoicesList from "../components/invoiceList/InvoicesList";

const InvoiceList = () => {
  const { invoiceList } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2">
      <div className="text-center mb-6">
        <h3 className="font-bold text-4xl">Invoice Dashboard</h3>
      </div>
      <div className="bg-white shadow-xl rounded-xl py-6 md:px-6 w-full max-w-5xl">
        {isListEmpty ? (
          <NoInvoices />
        ) : (
          <InvoicesList invoiceList={invoiceList} />
        )}
      </div>
    </div>
  );
};

export default InvoiceList;