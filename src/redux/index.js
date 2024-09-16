import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import productsReducer from "./productsSlice";
import currentInvoiceReducer from "./currentInvoiceSlice";

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  currentInvoice: currentInvoiceReducer,
});

export default rootReducer;
