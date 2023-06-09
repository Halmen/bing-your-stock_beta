"use client";
import {
  KeyboardEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
  Dispatch,
  SetStateAction,
} from "react";
import { css } from "@linaria/core";

import SymbolList from "@/components/SymbolList/SymbolList";
import ErrorCard from "@/app/error";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { Ticker } from "@/common/interfaces";
import Spinner from "@/components/Spinner/Spinner";
import debounce from "lodash.debounce";
const isKeyValid = (key: string) => {
  const isLetterNumber = key.length == 1 && /^[A-Za-z0-9]*$/.test(key);
  const isEnter = key === "Enter";
  const isBackspace = key === "Backspace";

  if (isLetterNumber || isBackspace || isEnter) {
    return true;
  }
  return false;
};

interface Props {
  setStockInfo: Dispatch<SetStateAction<Ticker | null>>;
}

const StockSearch = ({ setStockInfo }: Props) => {
  const [ticker, setTicker] = useState("");

  const onButtonInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const value = input.value;
      if (value && !isKeyValid(event.key)) {
        return;
      }
      setTicker(value);
    },
    []
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(onButtonInput, 700),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <>
      <h3>Enter Ticker Symbol</h3>
      <div className={inputContainerCSS}>
        <input
          className="tickerInput"
          placeholder="Enter a valid ticker symbol"
          onKeyDown={debouncedChangeHandler}
        />
        {ticker && (
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<Spinner className={listSpinnerCSS} />}>
              <SymbolList
                searchSymbol={ticker}
                resetSearchValue={() => setTicker("")}
                setStockInfo={setStockInfo}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
};

const inputContainerCSS = css`
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

    @media (min-width: 1350px) {
      width: 300px;
    }
  }

  input::placeholder {
    font-size: 0.825rem;
    @media (min-width: 360px) {
      font-size: unset;
    }
  }

  .invalidText {
    font-size: 1.5rem;
    line-height: 1.35rem;
    color: #db362d;
  }
`;

const listSpinnerCSS = css`
  margin: 20px auto;
  width: 75px;

  @media (min-width: 1350px) {
    margin: 50px 0 0 100px;
  }
`;

export default StockSearch;
