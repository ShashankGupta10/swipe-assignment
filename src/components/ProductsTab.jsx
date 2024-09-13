import React, { useState } from 'react';
import Button from './common/Button';

const ProductsTab = ({ products, setFormData }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '0.00',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setFormData((prevData) => ({ ...prevData, products: updatedProducts }));
    // Reset new product input fields
    setNewProduct({
      productName: '',
      productDescription: '',
      productPrice: '0.00',
    });
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setFormData((prevData) => ({ ...prevData, products: updatedProducts }));
  };

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">Products</h3>
      <div className="grid grid-cols-1 gap-4">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <h4 className="font-bold">{product.productName}</h4>
                <p>{product.productDescription}</p>
                <p className="text-gray-600">Price: ${product.productPrice}</p>
              </div>
              <Button
                onClick={() => removeProduct(product.id)}
                className="bg-red-500 text-white font-bold py-1 px-3 rounded"
              >
                Remove
              </Button>
            </div>
          ))}
      </div>

      <div className="mt-4">
        <h4 className="font-bold">Add New Product</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <input
            type="text"
            name="productDescription"
            placeholder="Product Description"
            value={newProduct.productDescription}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <input
            type="number"
            step="0.01"
            name="productPrice"
            placeholder="Price"
            value={newProduct.productPrice}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <Button
          onClick={addProduct}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductsTab;
