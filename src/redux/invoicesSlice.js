import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { invoiceSchema } from "../utils/invoiceSchema";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      // const { data, success, error } = invoiceSchema.safeParse(action.payload);
      // if (success) {
      //   toast.success("Invoice added successfully 🥳");
      //   state.push(data);
      //   return true
      // } else {
      //   console.log(error);
      //   const errorMessage = error.issues?.[0]?.message || "An error occurred";
      //   toast.error(`Failed to add invoice: ${errorMessage}`);
      //   return false
      // }
      state.push(action.payload);
      toast.success("Invoice added successfully 🥳");
    },
    deleteInvoice: (state, action) => {
      toast.success("Invoice deleted successfully 🥳");
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
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
