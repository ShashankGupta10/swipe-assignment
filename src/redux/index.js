import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import productsReducer from "./productsSlice";
import currentInvoiceReducer from "./currentInvoiceSlice";
import currencyReducer from "./currencySlice"

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  currentInvoice: currentInvoiceReducer,
  currency: currencyReducer,
});

export default rootReducer;
