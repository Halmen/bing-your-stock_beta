import axios from "axios";

const urlBase = "http://localhost:3000/api";

const NextApiClient = axios.create({
  baseURL: urlBase,
  timeout: 3000,
});

export const verifyStock = (
  tickeSymbol: string
): Promise<{ data: string } | { error: string }> =>
  NextApiClient.get(`/stock-verify?ticker=${tickeSymbol}`)
    .then((response) => ({
      data: response.data,
    }))
    .catch((error) => ({
      error: error,
    }));
