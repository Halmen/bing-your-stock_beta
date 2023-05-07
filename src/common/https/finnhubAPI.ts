import axios from "axios";
import { DetaildStock, StockQuote, StockCandle } from "@/common/interfaces";

const urlBase = "https://finnhub.io/api/v1";

const apiToken = "ch91ge9r01qtgm5dtld0ch91ge9r01qtgm5dtldg";

const finnHubClient = axios.create({
  baseURL: urlBase,
  timeout: 3000,
});

export const getStocks = () =>
  finnHubClient
    .get<DetaildStock>(`/stock/symbol?exchange=US&token=${apiToken}`)
    .then((response) => response.data)
    .catch((error) => error.response.status);

export const getStockQuote = (stockTicker: string) =>
  finnHubClient
    .get<StockQuote>(`/quote?symbol=${stockTicker}&token=${apiToken}`)
    .then((response) => response.data);

export const getStockChart = (stockTicker: string, resolution: string) => {
  const date = new Date();
  const currentTimestamp = date.getTime();
  date.setFullYear(date.getFullYear() - 1);
  const lastYearTimestamp = date.getTime();

  return finnHubClient
    .get<StockCandle>(
      `/stock/candle?symbol=${stockTicker}&resolution=${resolution}&from=${lastYearTimestamp}&to=${currentTimestamp}&token=${apiToken}`
    )
    .then((response) => response.data);
};
