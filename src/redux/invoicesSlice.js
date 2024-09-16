import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      toast.success("Invoice deleted successfully 🥳");
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      // const index = state.findIndex(
      //   (invoice) => invoice.id === action.payload.id
      // );
      // if (index !== -1) {
      //   state[index] = { ...state[index], ...action.payload.updatedInvoice };
      // } 
      return state.map((invoice) =>
        invoice.id === action.payload.id
          ? { ...invoice, ...action.payload.updatedInvoice }
          : invoice
      );
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
