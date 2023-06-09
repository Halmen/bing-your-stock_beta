"use client";
import { css } from "@linaria/core";
import { useState } from "react";
import { Ticker } from "@/common/interfaces";
import StockSearch from "@/components/StockSearch/StockSearch";
import StockDetails from "@/components/StockDetails/StockDetails";
import ErrorCard from "@/app/error";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Spinner from "@/components/Spinner/Spinner";
import ChartContainer from "@/components/ChartContainer/ChartContainer";
import { Suspense } from "react";

const App = () => {
  const [stockInfo, setStockInfo] = useState<Ticker | null>(null);
  return (
    <>
      <div className={containerCSS}>
        <div className="searchContainer">
          <StockSearch setStockInfo={setStockInfo} />
          {stockInfo && (
            <ErrorBoundary fallback={<ErrorCard />}>
              <Suspense fallback={<Spinner className={stockSpinnerCSS} />}>
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
            <>
              <ErrorBoundary fallback={<ErrorCard />}>
                <Suspense fallback={<Spinner className={chartSpinnerCSS} />}>
                  <ChartContainer
                    displaySymbol={stockInfo.displaySymbol}
                    companyName={stockInfo.companyName}
                  />
                </Suspense>
              </ErrorBoundary>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const stockSpinnerCSS = css`
  margin: 50px auto;
  width: 122px;
`;

const chartSpinnerCSS = css`
  text-align: center;
  margin-top: 150px;
`;

const containerCSS = css`
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
