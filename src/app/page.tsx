"use client";
import {
  KeyboardEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { Stock } from "@/common/interfaces";
import { css } from "@linaria/core";
import TickerSearch from "@/components/TickerSearch/TickerSearch";
import Spinner from "@/components/Spinner/Spinner";
import ErrorCard from "@/app/error";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import StockDetails from "@/components/StockDetails/StockDetails";
import Chart from "@/components/Chart/Chart";
import { verifyStock } from "@/common/https/nextAPI";
import debounce from "lodash.debounce";

const App = () => {
  const [tickerStatus, setTickerStatus] = useState("");
  const [stockInfo, setStockInfo] = useState<Stock | null>(null);

  const onButtonInput = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const value = input.value;
      const isLetterNumber =
        event.key.length == 1 && /^[A-Za-z0-9]*$/.test(event.key);
      const isEnter = event.key === "Enter";
      const isBackspace = event.key === "Backspace";
      if (!value.length) {
        setTickerStatus("");
        setStockInfo(null);
      } else if (isLetterNumber || isBackspace || isEnter) {
        setTickerStatus("Loading...");
        const { data } = await verifyStock(value.toUpperCase().trim());
        if (data?.error) {
          setTickerStatus(data.error);
        } else {
          setStockInfo({
            displaySymbol: data.displaySymbol,
            companyName: data.companyName,
          });
          setTickerStatus("");
        }
      }
    },
    []
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(onButtonInput, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <>
      <div className={container}>
        <div className="searchContainer">
          <TickerSearch
            onChange={debouncedChangeHandler}
            tickerStatus={tickerStatus}
          />
          {stockInfo && (
            <ErrorBoundary fallback={<ErrorCard />}>
              <Suspense fallback={<Spinner className={stockSpinner} />}>
                <StockDetails
                  displaySymbol={stockInfo.displaySymbol}
                  companyName={stockInfo.companyName}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
        <div className="border" />
        <div className="chartContainer">
          {stockInfo && (
            <ErrorBoundary fallback={<ErrorCard />}>
              <Suspense fallback={<Spinner className={chartSpinner} />}>
                <Chart
                  displaySymbol={stockInfo.displaySymbol}
                  companyName={stockInfo.companyName}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </div>
    </>
  );
};

const stockSpinner = css`
  margin: 50px auto;
  width: 122px;
`;

const chartSpinner = css`
  text-align: center;
  margin-top: 150px;
`;

const container = css`
  width: 100%;
  height: calc(100vh - 119px);
  display: flex;
  flex-direction: column;

  @media (min-width: 1350px) {
    flex-direction: row;
  }

  h3 {
    font-size: 2rem;
  }

  .searchContainer {
    width: 100%;
    padding: 20px 40px;

    @media (min-width: 1350px) {
      width: 50%;
    }
  }

  .border {
    display: none;

    @media (min-width: 1350px) {
      display: block;
      width: 2px;
      background-color: gray;
      height: 100vh- 119px;
      margin-bottom: -34px;
    }
  }

  .chartContainer {
    padding: 65px 0 0 40px;
    width: 100%;

    @media (min-width: 1350px) {
      width: 50%;
    }
  }
`;

export default App;
