export const fetchExchangeRates = async (targetCurrency) => {
    const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?base_currency=USD&currencies=${targetCurrency}&apikey=fca_live_Vgab5S9zZ9wLi7DuX40hZ5KMhZ5Vn8oIxvb5WJq6`
    );
    const data = await response.json();
    return data.data;
};