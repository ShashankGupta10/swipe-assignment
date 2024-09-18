import { useGetProducts } from "../../redux/hooks";
import { useState } from "react";
import { FaEdit, FaPlus, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentInvoice } from "../../redux/currentInvoiceSlice";
import { updateProduct } from "../../redux/productsSlice";
import Button from "../common/Button";
import { productSchema } from "../../utils/productSchema";
import { toast } from "react-toastify";

const ProductsModal = ({ showModal, closeModal }) => {
  const data = useGetProducts();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currentInvoice.currency);
  const { conversionRate } = useSelector((state) => state.currency);
  const formData = useSelector((state) => state.currentInvoice);

  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleAddItem = (id) => {
    const isItemPresent = formData.items.find((i) => i?.id === id);
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

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const { success, data, error } = productSchema.safeParse(editedProduct);
    if (!success) {
      toast.error(`Failed to edit product: ${error.issues?.[0]?.message || "An error occurred"}`);
      return;
    }
    dispatch(
      updateProduct({ id: data.id, updatedProduct: data })
    );
    setEditingProductId(null); // Exit editing mode after saving
  };

  return (
    <div>
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
              {data.products.map((product) => {
                const isEditing = editingProductId === product.id;
                return (
                  <div
                    className="flex flex-col space-y-3 py-4 text-left sm:flex-row sm:space-x-5 sm:space-y-0 p-4 rounded-xl border cursor-grab bg-white hover:scale-105"
                    key={product.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, product)}
                    onDragEnd={() => setDraggedProduct(null)}
                  >
                    <div className="shrink-0">
                      <img
                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                        src={product.productImage}
                        alt={product.productName}
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="sm:col-gap-5 sm:grid sm:grid-cols-5 gap-3">
                        <div className="flex flex-col gap-2 col-span-4">
                          {isEditing ? (
                            <input
                              className="w-full flex-1 md:w-auto px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              type="text"
                              name="productName"
                              value={editedProduct.productName}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="mx-0 mt-1 mb-0 font-semibold">
                              {product.productName}
                            </p>
                          )}
                          {isEditing ? (
                            <input
                              className="w-full md:w-auto px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              type="text"
                              name="productDescription"
                              value={editedProduct.productDescription}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              {product.productDescription}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          {isEditing ? (
                            <input
                              className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              type="number"
                              name="productPrice"
                              value={editedProduct.productPrice}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              {currency}{" "}
                              {(product.productPrice * conversionRate).toFixed(
                                2
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <div>
                          <Button
                            className="text-indigo-600 hover:scale-110 ml-auto h-full"
                            type={"button"}
                            onClick={
                              isEditing ? handleSave : () => handleEdit(product)
                            }
                          >
                            {isEditing ? <FaSave /> : <FaEdit />}
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="text-indigo-600 hover:scale-110 ml-auto"
                            type={"button"}
                            onClick={() => handleAddItem(product.id)}
                          >
                            <FaPlus /> Add Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsModal;
