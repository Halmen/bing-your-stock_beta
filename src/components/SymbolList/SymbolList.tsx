"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Ticker } from "@/common/interfaces";
import Card from "@/components/Card/Card";
import { getStockSymbolLookup } from "@/common/https/finnhubAPI";
import { css } from "@linaria/core";
import useSWR from "swr";
import { StockSchemaModel } from "@/common/zodSchemas";

interface Props {
  searchSymbol: string;
  resetSearchValue: () => void;
  setStockInfo: Dispatch<SetStateAction<Ticker | null>>;
}

const SymbolList = ({
  searchSymbol,
  resetSearchValue,
  setStockInfo,
}: Props) => {
  const { data } = useSWR(
    `finnhub/symbol/${searchSymbol}`,
    () => getStockSymbolLookup(searchSymbol),
    {
      suspense: true,
    }
  );

  const onClick = useCallback((tickerSymbol: string, companyName?: string) => {
    setStockInfo({ displaySymbol: tickerSymbol, companyName });
    resetSearchValue();
  }, []);

  return (
    <div className={suggestionContainer}>
      {data?.count < 1 ? (
        <p>No results</p>
      ) : (
        <>
          {data.result.map((stock: StockSchemaModel) => (
            <Card key={stock.symbol}>
              <div
                className={suggestion}
                key={stock.symbol}
                onClick={() => onClick(stock.symbol, stock.description)}
              >
                <div className="title">
                  <p className="symbol">{stock.symbol}</p>
                  <p className="description">{stock.description}</p>
                </div>
                <p className="type">{stock.type}</p>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

const suggestionContainer = css`
  z-index: 1000;
  background-color: #ebebeb;
  position: relative;
  overflow-y: auto;
  max-height: 350px;
  border-radius: 5px;
  border-color: rgb(30, 117, 216);
  border-style: solid;
  border-width: 0px 1px 1px;
  padding: 0 3px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 15px;

  @media (min-width: 1350px) {
    width: fit-content;
  }
`;

const suggestion = css`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 0.125rem;
  margin: 15px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    padding-right: 100px;
  }

  @media (min-width: 1350px) {
    padding-right: 0;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1350px) {
      align-items: start;
    }
  }

  .symbol {
    line-height: 0.125rem;
    font-weight: 600;
    color: rgb(71, 193, 15);
  }

  .description {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .type {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`;

export default SymbolList;
