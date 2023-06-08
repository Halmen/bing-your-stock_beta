import { ReactNode } from "react";
import { css } from "@linaria/core";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Card = ({ children, onClick }: Props) => (
  <div className={card} onClick={onClick} role="presentation">
    {children}
  </div>
);

const card = css`
  width: 100%;
  margin: 5px 0;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #647be0;
  transition: box-shadow 0.3s ease-in-out;
  color: #4d4e58;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  @media (min-width: 1350px) {
    width: 300px;
  }

  &:hover {
    box-shadow: "0 10px 30px rgba(0, 0, 0, 0.17)";
    background-color: #f2f4ff;
  }
`;

export default Card;
