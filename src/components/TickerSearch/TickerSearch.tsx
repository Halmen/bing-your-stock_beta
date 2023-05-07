"use client";
import { KeyboardEvent, useState } from "react";
import { css } from "@linaria/core";

interface Props {
  onChange: (event: KeyboardEvent<HTMLInputElement>) => void;
  tickerStatus: string;
}

const TickerSearch = ({ onChange = () => null, tickerStatus }: Props) => (
  <>
    <h3>Enter Ticker Symbol</h3>
    <div className={inputContainer}>
      <input
        className="tickerInput"
        placeholder="Enter a valid ticker symbol"
        onKeyDown={(event) => onChange(event)}
      />
      {tickerStatus && <p className="invalidText">{tickerStatus}</p>}
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
    line-height: 0.75rem;
    color: red;
  }
`;

export default TickerSearch;
