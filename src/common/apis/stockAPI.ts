import axios from "axios";

const urlBase = "https://finnhub.io/api/v1";

const apiToken = "ch91ge9r01qtgm5dtld0ch91ge9r01qtgm5dtldg";

const finnHubClient = axios.create({
  baseURL: urlBase,
  timeout: 3000,
});

export const getStocks = () =>
  finnHubClient
    .get(`/stock/symbol?exchange=US&token=${apiToken}`)
    .then((response) => ({
      data: response.data,
    }))
    .catch((error) => ({
      error: error,
    }));

export const getStockQuote = (stockTicker: string) =>
  finnHubClient
    .get(`/quote?symbol=${stockTicker}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

export const getStockData = (stockTicker: string, resolution: string) => {
  const date = new Date();
  const currentTimestamp = date.getTime();
  date.setFullYear(date.getFullYear() - 1);
  console.log(date);
  const lastYearTimestamp = date.getTime();
  finnHubClient
    .get(
      `/stock/candle?symbol=${stockTicker}&resolution=${resolution}&from=${lastYearTimestamp}&to=${currentTimestamp}`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
