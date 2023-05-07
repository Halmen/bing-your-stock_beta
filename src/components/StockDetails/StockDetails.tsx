import { Stock } from "@/common/interfaces";
import useSWR from "swr";
import { getStockQuote } from "@/common/https/finnhubAPI";
import { css } from "@linaria/core";

interface Props extends Stock {
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
    }
  );

  return (
    <>
      <p className={symbol}>{displaySymbol}</p>
      <div className={stockContainer}>
        <div className="description">
          <div>
            <p className="name">{companyName}</p>
          </div>
          <h2 className="currentPrice">{`${data?.c} ${currency}`}</h2>
        </div>
        <div>
          {["pc", "o", "h", "l"].map((stat: string) => (
            <div className="stockValues" key={stat}>
              <p className="key">{stats[stat as keyof typeof stats]}</p>
              <p className="value">{`${data[stat]} ${currency}`}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const symbol = css`
  font-size: 1.5rem;
  line-height: 0.125rem;
`;

const stockContainer = css`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;

  @media (min-width: 540px) {
    justify-content: space-between;
    flex-direction: row;
  }

  .description {
    height: fit-content;
    margin-bottom: 35px;
    display: flex;
    justify-content: space-between;

    @media (min-width: 540px) {
      display: block;
      margin-bottom: 0;
    }

    .name {
      font-size: 2rem;
      line-height: 0.125rem;
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
