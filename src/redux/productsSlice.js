import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
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
export default productsSlice.reducer;
