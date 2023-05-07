"use client";
import { css } from "@linaria/core";
import { useEffect } from "react";

interface Props {
  error?: Error;
}

const ErrorCard = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={errorCardCSS}>
      <p className="errorText">
        Something went wrong, keep calm and carry on...
      </p>
      <button className="refreshButton" onClick={() => location.reload()}>
        Try Again
      </button>
    </div>
  );
};

const errorCardCSS = css`
  border-radius: 10px;
  border: 2px solid rgb(178, 7, 7);
  width: calc(100% - 40px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  .errorText {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 50px;
    color: rgb(205, 53, 43);
  }

  .refreshButton {
    height: 40px;
    font-size: 1rem;
    width: fit-content;
    padding: 0 15px;
    border-radius: 10px;
    color: rgb(205, 53, 43);
    border: 2px solid rgb(178, 7, 7);
    background-color: white;
    cursor: pointer;
  }
`;

export default ErrorCard;
