import { useGetProducts } from "../../redux/hooks";
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa"; // Import edit and save icons
import { useSelector } from "react-redux";

const ProductsTab = () => {
  const { products } = useGetProducts();
  const [_, setDraggedProduct] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editedProduct, setEditedProduct] = useState({}); // Store edited values

  const currency = useSelector((state) => state.currentInvoice.currency);

  const handleDragStart = (e, product) => {
    e.dataTransfer.setData("application/json", JSON.stringify(product.id));
    setDraggedProduct(product.id);
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateProduct(editedProduct); // Dispatch the updated product to Redux
    setEditingProductId(null); // Exit edit mode
  };

  return (
    <div className="w-1/3 fixed lg:flex right-0 h-[calc(100vh-25px)] overflow-y-scroll md:m-4 m-2 p-4 border rounded-xl hidden flex-col gap-4 bg-gray-50">
      {products.map((product) => {
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
                      {currency} {product.productPrice}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="text-indigo-600 hover:scale-110 ml-auto"
                onClick={isEditing ? handleSave : () => handleEdit(product)}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsTab;
