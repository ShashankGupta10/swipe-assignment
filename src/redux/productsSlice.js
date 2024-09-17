import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [{
    id: 1,
    productName: 'Product 1',
    productDescription: 'Description of Product 1',
    productPrice: 2,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 2,
    productName: 'Product 2',
    productDescription: 'Description of Product 2',
    productPrice: 3,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 3,
    productName: 'Product 3',
    productDescription: 'Description of Product 3',
    productPrice: 4,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 4,
    productName: 'Product 4',
    productDescription: 'Description of Product 4',
    productPrice: 5,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 5,
    productName: 'Product 5',
    productDescription: 'Description of Product 5',
    productPrice: 6,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 6,
    productName: 'Product 6',
    productDescription: 'Description of Product 6',
    productPrice: 7,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 7,
    productName: 'Product 7',
    productDescription: 'Description of Product 7',
    productPrice: 8,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 8,
    productName: 'Product 8',
    productDescription: 'Description of Product 8',
    productPrice: 9,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 9,
    productName: 'Product 9',
    productDescription: 'Description of Product 9',
    productPrice: 10,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  },
  {
    id: 10,
    productName: 'Product 10',
    productDescription: 'Description of Product 10',
    productPrice: 11,
    productQuantity: 1,
    productImage: 'https://picsum.photos/200',
  }
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload.updatedProduct };
      }
    },
  },
});

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
