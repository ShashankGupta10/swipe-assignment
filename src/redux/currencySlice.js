import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExchangeRates } from "../utils/fetchExchangeRates";

const initialState = {
  rates: {},
  baseCurrency: "USD",
  targetCurrency: "USD",
  conversionRate: 1,
  status: "idle",
  error: null,
};

export const getCurrencyRates = createAsyncThunk(
  "currency/getCurrencyRates",
  async (targetCurrency, { getState }) => {
    const state = getState().currency;
    if (targetCurrency === "USD") return { USD: 1 };
    else if (state.rates[targetCurrency]) return state.rates;
    else {
      const rates = await fetchExchangeRates(targetCurrency);
      return { ...state.rates, ...rates };
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setTargetCurrency(state, action) {
      state.targetCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencyRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrencyRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload;
        state.conversionRate = action.payload[state.targetCurrency] || 1;
      })
      .addCase(getCurrencyRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTargetCurrency } = currencySlice.actions;

export default currencySlice.reducer;
