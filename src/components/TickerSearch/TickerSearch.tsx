import { TickerStatus } from "@/common/apis/interfaces";
import { KeyboardEvent, useState } from "react";
import { css } from "@linaria/core";

interface Props {
  tickerSymbol: string;
  onChange: (event: KeyboardEvent<HTMLInputElement>) => void;
  tickerStatus?: TickerStatus;
  error?: string;
}

const TickerSearch = ({
  tickerSymbol = "",
  onChange = () => null,
  tickerStatus,
}: Props) => (
  <>
    <h3>Enter Ticker Symbol</h3>
    <div className={inputContainer}>
      <input
        className="tickerInput"
        placeholder="Enter a valid ticker symbol"
        onKeyDown={(event) => onChange(event)}
      />
      {tickerSymbol.length > 0 && tickerStatus === "invalid" && (
        <p className="invalidText">Ticker symbol is invalid</p>
      )}
    </div>
  </>
);

const inputContainer = css`
  height: 120px;

  .tickerInput {
    outline: none;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    font-size: 1rem;
    padding-left: 5px;
    border-color: rgb(128, 126, 126);
    text-transform: uppercase;

    &:focus {
      border-color: rgb(30, 117, 216);
    }

    @media (min-width: 1040px) {
      width: 300px;
    }
  }

  .invalidText {
    font-size: 1.5rem;
    color: red;
  }
`;

export default TickerSearch;
