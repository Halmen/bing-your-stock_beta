import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getStocks } from "@/common/https/finnhubAPI";

interface Stock {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

let cachedStockList: Stock[] = [];

export async function GET(request: NextApiRequest) {
  const { url } = request;
  const tickerSymbol = url?.split("=").pop();
  let stockList: Stock[] = [];
  if (!cachedStockList.length) {
    const data = await getStocks();
    if (data?.error) {
      console.log(data.error);
      return NextResponse.json({
        error: `The response status is ${data.error}, contact support`,
      });
    } else if (data?.list) {
      cachedStockList = [...data.list];
      stockList = data.list;
    }
  } else {
    stockList = [...cachedStockList];
  }
  const stockData = stockList.find(
    (stock) => stock?.displaySymbol === tickerSymbol
  );

  if (!stockData) {
    return NextResponse.json({
      error: `Ticker symbol not found!`,
    });
  }

  return NextResponse.json({
    displaySymbol: stockData?.displaySymbol,
    companyName: stockData?.description,
  });
}
