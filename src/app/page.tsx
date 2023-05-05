"use client";

import { KeyboardEvent, useEffect, useState, useMemo } from "react";
import { TickerStatus } from "@/common/apis/interfaces";
import { css } from "@linaria/core";
import TickerSearch from "@/components/TickerSearch/TickerSearch";
import Spinner from "@/components/Spinner/Spinner";
import StockDetails from "@/components/StockDetails/StockDetails";
import Chart from "@/components/Chart/Chart";
import debounce from "lodash.debounce";

const App = () => {
  const [tickerStatus, setTickerStatus] = useState<TickerStatus>(null);
  const [tickerSymbol, setTickerSymbol] = useState("");

  /*
  if (stocList) {
    simplifiedStockList = stocList.map(({ description, displaySymbol }) => ({
      description,
      displaySymbol,
    }));
  }

   useEffect(() => {
    (async () => {
      const stocks = await getStocks();
      if (stocks) {
        setStockList(stocks?.data);
      }
    })();
  }, []);*/

  const onButtonInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(onButtonInput, 1000),
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
            tickerSymbol={tickerSymbol}
            onChange={debouncedChangeHandler}
          />
          {tickerStatus === "valid" && (
            <StockDetails
              displaySymbol={tickerSymbol}
              companyName="Microsoft"
            />
          )}
        </div>
        <div className="chartContainer">
          {tickerStatus === "valid" && <Chart tickerSymbol={tickerSymbol} />}
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
  margin: -8px -80px 0;
  height: 85px;
`;

const container = css`
  width: 100%;
  height: 100vh;
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
