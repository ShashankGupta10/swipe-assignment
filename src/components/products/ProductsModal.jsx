import { useSelector } from "react-redux";
import { useGetProducts } from "../../redux/hooks";
import Button from "../common/Button";
import { FaPlus } from "react-icons/fa";

const ProductsModal = ({ showModal, closeModal }) => {
  const data = useGetProducts();
  const currency = useSelector((state) => state.currentInvoice.currency);
  const { conversionRate } = useSelector((state) => state.currency);

  return (
    <div className="lg:hidden">
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white mx-2 w-full md:w-5/6 h-[80vh] rounded-lg p-6 overflow-y-scroll relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="flex flex-col gap-4">
              {data.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex text-left flex-row space-x-5 space-y-0 p-4 rounded-xl border cursor-pointer bg-gray-50"
                >
                  <div className="shrink-0">
                    <img
                      className="h-24 w-24 max-w-full rounded-lg object-cover"
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                      <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-900">
                          {product.productName}
                        </p>
                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                          {product.productDescription}
                        </p>
                      </div>

                      <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                          {currency}{" "}
                          {(product.productPrice * conversionRate).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button
                        className="mt-4 w-44 sm:w-auto"
                        onClick={() => console.log("Add item")}
                      >
                        <FaPlus /> Add Item
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsModal;
