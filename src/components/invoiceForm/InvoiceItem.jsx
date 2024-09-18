import React, { memo, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Button from "../common/Button";
import ProductsModal from "../products/ProductsModal";
import { useGetProduct } from "../../redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentInvoice } from "../../redux/currentInvoiceSlice";
import { FaDropbox } from "react-icons/fa";

const InvoiceItem = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.currentInvoice);
  const { currency, items } = useSelector((state) => state.currentInvoice);
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const id = JSON.parse(data);
    const isItemPresent = items.find((i) => i?.id === id);
    if (isItemPresent)
      dispatch(
        updateCurrentInvoice({
          items: formData.items.map((i) =>
            i.id === id ? { ...i, quantity: isItemPresent.quantity + 1 } : i
          ),
        })
      );
    else
      dispatch(
        updateCurrentInvoice({
          items: [...formData.items, { id: id, quantity: 1 }],
        })
      );
  };

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border p-4"
      key={`${Math.random()}`}
    >
      <div
        className="lg:flex gap-8 w-full border-indigo-600 border-dashed border-2 h-40 rounded-xl hidden justify-center items-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <FaDropbox className="w-12 h-12 text-indigo-600" />
        <span className="text-xl">Drag Products from products tab and drop here</span>
      </div>
      {items.length > 0 &&
        items.map((item, idx) => (
          <ItemForm key={idx} item={item} currency={currency} />
        ))}
      <span>
        <Button
          onClick={() => setOpenProductModal(true)}
          type={"button"}
          className="lg:hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-indigo-600 transition font-medium"
        >
          <BiPlus className="w-6 h-6" /> Add Item
        </Button>
      </span>
      <ProductsModal
        showModal={openProductModal}
        closeModal={() => setOpenProductModal(false)}
      />
    </div>
  );
};

export default InvoiceItem;

const ItemForm = memo(({ key, item, currency }) => {
  const itemData = useGetProduct(item.id);
  const dispatch = useDispatch();
  const { conversionRate } = useSelector((state) => state.currency);
  const formData = useSelector((state) => state.currentInvoice);

  const handleAddItem = () => {
    dispatch(
      updateCurrentInvoice({
        items: formData.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: item.quantity + 1,
              }
            : i
        ),
      })
    );
  };

  const handleSubtractItem = (e) => {
    e.target.value = item.quantity - 1;
    if (item.quantity > 1)
      dispatch(
        updateCurrentInvoice({
          items: formData.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: item.quantity - 1,
                }
              : i
          ),
        })
      );
    else
      dispatch(
        updateCurrentInvoice({
          items: formData.items.filter((i) => i.id !== item.id),
        })
      );
  };

  return (
    <section key={key}>
      <div className="flow-root">
        <ul className="rounded-xl border px-6">
          <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
            <div className="shrink-0">
              <img
                className="h-24 w-24 max-w-full rounded-lg object-cover"
                src={itemData.productImage}
                alt=""
              />
            </div>

            <div className="relative flex flex-1 flex-col justify-between">
              <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                <div className="pr-8 sm:pr-5">
                  <p className="text-base font-semibold text-gray-900">
                    {itemData.productName}
                  </p>
                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                    {itemData.productDescription}
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                    {currency}{" "}
                    {(itemData.productPrice * conversionRate).toFixed(2)}
                  </p>

                  <div className="sm:order-1">
                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                      <button
                        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                        type="button"
                        onClick={handleSubtractItem}
                      >
                        -
                      </button>
                      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                        {item.quantity}
                      </div>
                      <button
                        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                        type="button"
                        onClick={handleAddItem}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                <button
                  type="button"
                  className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                  onClick={() => onDelEvent(item.id)}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                      className=""
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
});
