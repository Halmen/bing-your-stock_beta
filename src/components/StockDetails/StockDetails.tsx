"use client";
import { Ticker } from "@/common/interfaces";
import { getStockQuote } from "@/common/https/finnhubAPI";
import { css } from "@linaria/core";
import useSWR from "swr";

interface Props extends Ticker {
  currency?: string;
}

const stats = {
  pc: "Previous Close:",
  o: "Todays Open:",
  h: "Todays High:",
  l: "Todays Low:",
};

const StockDetails = ({
  displaySymbol,
  companyName,
  currency = "USD",
}: Props) => {
  const { data } = useSWR(
    `finnhub/quote/${displaySymbol}`,
    () => getStockQuote(displaySymbol),
    {
      suspense: true,
      refreshInterval: 15000, // re-fetch data every 15s, just to make sure no to time out on the sever
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <p className={symbolCSS}>{displaySymbol}</p>
      <div className={stockContainerCSS}>
        <div className="description">
          <p className="name">{companyName}</p>
          <h2 className="currentPrice">
            {data?.c
              ? `${data.c} ${currency}`
              : "You don't have access to this stock"}
          </h2>
        </div>
        <div>
          {data?.c &&
            ["pc", "o", "h", "l"].map((stat: string) => (
              <div className="stockValues" key={stat}>
                <p className="key">{stats[stat as keyof typeof stats]}</p>
                <p className="value">{`${
                  data[stat as keyof typeof data]
                } ${currency}`}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const symbolCSS = css`
  font-size: 1.5rem;
  line-height: 0.125rem;
`;

const stockContainerCSS = css`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  gap: 35px;
  width: 100%;

  @media (min-width: 650px) {
    justify-content: space-between;
    flex-direction: row;
    max-width: unset;
  }

  .description {
    height: fit-content;
    justify-content: space-between;

    .name {
      font-size: 2rem;
    }

    .currentPrice {
      font-size: 2rem;
      line-height: 20px;
      color: rgb(71, 193, 15);
    }
  }

  .stockValues {
    display: flex;
    justify-content: space-between;
    gap: 105px;

    .key,
    .value {
      font-weight: 600;
    }

    .value {
      color: rgb(71, 193, 15);
    }
  }
`;

export default StockDetails;
