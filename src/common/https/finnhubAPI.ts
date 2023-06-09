import axios from "axios";
import {
  StockQuoteSchema,
  StockCandleSchema,
  SymbolLookUpSchema,
  StockQuoteModel,
  StockCandleModel,
  SymbolLookUpModel,
} from "@/common/zodSchemas";

const urlBase = "https://finnhub.io/api/v1";

const finnHubClient = axios.create({
  baseURL: urlBase,
  timeout: 3000,
});

export const getStockSymbolLookup = (searchSymbol: string) =>
  finnHubClient
    .get<SymbolLookUpModel>(
      `/search?q=${searchSymbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_TOKEN}`
    )
    .then((response) => SymbolLookUpSchema.parse(response.data))
    .catch((error) => error);

export const getStockQuote = (stockTicker: string) =>
  finnHubClient
    .get<StockQuoteModel>(
      `/quote?symbol=${stockTicker}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_TOKEN}`
    )
    .then((response) => StockQuoteSchema.parse(response.data))
    .catch((error) => error);

export const getStockChart = (
  stockTicker: string,
  resolution: string,
  lastYearTimestamp: number,
  currentTimestamp: number
) =>
  finnHubClient
    .get<StockCandleModel>(
      `stock/candle?symbol=${stockTicker}&resolution=${resolution}&from=${lastYearTimestamp}&to=${currentTimestamp}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_TOKEN}`
    )
    .then((response) => StockCandleSchema.parse(response.data))
    .catch((error) => error);
