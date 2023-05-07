import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getStocks } from "@/common/https/finnhubAPI";
import { DetaildStock } from "@/common/interfaces";

let cachedStockList: DetaildStock[] = [];

export async function GET(request: NextApiRequest) {
  const { url } = request;
  const tickerSymbol = url?.split("=").pop();
  let stockList: DetaildStock[] = [];
  if (!cachedStockList.length) {
    const data = await getStocks();
    if (typeof data === "number") {
      return NextResponse.json({
        error: `Error status: ${data}, contact support`,
      });
    } else if (data.length) {
      cachedStockList = [...data];
      stockList = data;
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
