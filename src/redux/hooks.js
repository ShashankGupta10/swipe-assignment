import { useDispatch, useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { updateProduct } from "./productsSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useGetProducts = () => {
  return useSelector((state) => state.products);
}

export const useGetProduct = (id) => {
  return useSelector((state) => state.products.products.find((product) => product.id === id));
}
