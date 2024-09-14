import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [{
    id: 1,
    productName: 'Product 1',
    productDescription: 'Description of Product 1',
    productPrice: 10,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 2,
    productName: 'Product 2',
    productDescription: 'Description of Product 2',
    productPrice: 20,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 3,
    productName: 'Product 3',
    productDescription: 'Description of Product 3',
    productPrice: 30,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 4,
    productName: 'Product 4',
    productDescription: 'Description of Product 4',
    productPrice: 40,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 5,
    productName: 'Product 5',
    productDescription: 'Description of Product 5',
    productPrice: 50,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 6,
    productName: 'Product 6',
    productDescription: 'Description of Product 6',
    productPrice: 60,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  }
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...action.payload };
      }
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, setProducts } = productsSlice.actions;
export const getProducts = (state) => state;
export default productsSlice.reducer;
