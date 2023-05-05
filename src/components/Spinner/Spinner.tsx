import { css } from "@linaria/core";
import Image from "next/image";

const Spinner = () => (
  <Image
    src="/infinite-loading-spinner.png"
    width={150}
    height={150}
    className={spinner}
    alt="Loading...."
  />
);

const spinner = css`
  animation: spin 2s linear infinite;
  width: inherit;
  height: inherit;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

export default Spinner;
