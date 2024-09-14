import { useGetProducts } from "../../redux/hooks";
import { useState } from "react";

const ProductsTab = () => {
  const data = useGetProducts();
  const [_, setDraggedProduct] = useState(null);

  const handleDragStart = (e, product) => {
    e.dataTransfer.setData("application/json", JSON.stringify(product));
    setDraggedProduct(product);
  };

  return (
    <div className="md:m-4 m-2 p-4 border rounded-xl flex flex-col gap-4">
      {data.products.map((product, idx) => {
        return (
          <div
            className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 p-4 rounded-xl border cursor-grab"
            key={idx}
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
                    $ {product.productPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsTab;
