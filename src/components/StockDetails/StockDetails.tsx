import ErrorCard from "@/components/ErrorCard/ErrorCard";
import { css } from "@linaria/core";

interface Props {
  displaySymbol: string;
  companyName: string;
  currency?: string;
  error?: string;
}

const StockDetails = ({
  displaySymbol,
  companyName,
  currency = "USD",
  error,
}: Props) => {
  const stockValues = [{ stat: "", value: "" }];
  const price = 654.64;

  return (
    <>
      {error ? (
        <ErrorCard />
      ) : (
        <>
          <p className={symbol}>{displaySymbol}</p>
          <div className={stockContainer}>
            <div className="description">
              <div>
                <p className="name">{companyName}</p>
              </div>
              <h2 className="currentPrice">{`${price} ${currency}`}</h2>
            </div>
            <div>
              {stockValues.map(({ stat, value }) => (
                <div className="stockValues" key={stat}>
                  <p className="key">{stat}</p>
                  <p className="value">{`${value} ${currency}`}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
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
