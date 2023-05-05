import { ReactNode } from "react";
import { css } from "@linaria/core";

interface Props {
  message?: string;
  children?: ReactNode;
}

const ErrorCard = ({
  message = "Something went wrong, keep calm and carry on...",
  children,
}: Props) => (
  <div className={errorCard}>
    {children || <p className="errorText">{message}</p>}
    <button className="refreshButton" onClick={() => location.reload()}>
      Try Again
    </button>
  </div>
);

const errorCard = css`
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
