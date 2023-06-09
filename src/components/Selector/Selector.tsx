"use client";
import { Dispatch, SetStateAction } from "react";
import { css } from "@linaria/core";

interface Props {
  activeIndex?: number;
  onButtonClick: Dispatch<SetStateAction<number>>;
  buttons: string[];
}

const Selector = ({ activeIndex = 0, onButtonClick, buttons = [] }: Props) => (
  <div className={selector}>
    {buttons.map((name, index) => (
      <button
        key={name}
        className={selectorButton}
        onClick={() => onButtonClick(index)}
        {...(index === activeIndex && { ["data-active"]: true })}
      >
        {name}
      </button>
    ))}
  </div>
);

const selector = css`
  border: #0e03ab solid 2px;
  min-width: 200px;
  border-radius: 4px;
  display: flex;
  height: 34px;
  padding: 3px;
`;

const selectorButton = css`
  width: 100%;
  color: #0e03ab;
  font-weight: bold;
  line-height: 0.875rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &[data-active] {
    background-color: #5edbfe;
  }
`;

export default Selector;
