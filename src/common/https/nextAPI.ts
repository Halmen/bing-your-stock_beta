import axios from "axios";

interface StockVerify {
  error?: string;
  displaySymbol?: string;
  companyName?: string;
}

const urlBase = "https://localhost:3000/api";

const NextApiClient = axios.create({
  baseURL: urlBase,
  timeout: 3000,
});

export const verifyStock = (tickeSymbol: string) =>
  NextApiClient.get<StockVerify>(`/stock-verify?ticker=${tickeSymbol}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
