import { createSlice } from "@reduxjs/toolkit";
import generateRandomId from "../utils/generateRandomId";
import { toast } from "react-toastify";
import { invoiceSchema } from "../utils/invoiceSchema";

const initialState = {
    id: generateRandomId(),
    currentDate: new Date().toLocaleDateString(),
    invoiceNumber: 1,
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    total: "0.00",
    subTotal: "0.00",
    taxRate: "",
    taxAmount: "0.00",
    discountRate: "",
    discountAmount: "0.00",
    currency: "$",
    items: [],
};

const currentInvoiceSlice = createSlice({
    name: "currentInvoice",
    initialState,
    reducers: {
        updateCurrentInvoice: (state, action) => {
            return { ...state, ...action.payload };
        },
        initializeCurrentInvoice: (_, action) => {
            const { invoiceNumber } = action.payload;
            const id = generateRandomId();
            const currentDate = new Date().toLocaleDateString();
            return { ...initialState, id, currentDate, invoiceNumber };
        },
    },
});

export const { 
    updateCurrentInvoice, 
    initializeCurrentInvoice
} = currentInvoiceSlice.actions;
export default currentInvoiceSlice.reducer;
