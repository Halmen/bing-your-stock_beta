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
        const { data } = await verifyStock(value.toUpperCase().trim());

        if (data?.error) {
          setTickerStatus(data.error);
        } else {
          setStockInfo({
            displaySymbol: data.displaySymbol,
            companyName: data.companyName,
          });
        }
      }
    },
    []
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(onButtonInput, 1000),
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
      <div className={banner} />
      <div className={container}>
        <div className="searchContainer">
          <TickerSearch
            onChange={debouncedChangeHandler}
            tickerStatus={tickerStatus}
          />
          {stockInfo && (
            <ErrorBoundary fallback={<ErrorCard />}>
              <Suspense fallback={<Spinner />}>
                <StockDetails
                  displaySymbol={stockInfo.displaySymbol}
                  companyName={stockInfo.companyName}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
        <div className="chartContainer">
          {stockInfo && (
            <ErrorBoundary fallback={<ErrorCard />}>
              <Suspense fallback={<Spinner />}>
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

const banner = css`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 78%
  );
  margin: -8px -8px 0;
  height: 85px;
`;

const container = css`
  width: 100%;
  height: calc(100vh - 119px);
  display: flex;
  flex-direction: column;

  @media (min-width: 1040px) {
    flex-direction: row;
  }

  h3 {
    font-size: 2rem;
  }

  .searchContainer {
    width: 100%;
    padding: 20px 40px;

    @media (min-width: 1040px) {
      border-right: 2px solid gray;
      width: 50%;
    }
  }

  .chartContainer {
    padding: 65px 0 0 40px;
    width: 100%;

    @media (min-width: 1040px) {
      width: 50%;
    }
  }
`;

export default App;
