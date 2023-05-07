import { css } from "@linaria/core";
import Image from "next/image";

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => (
  <div className={className}>
    <Image
      src="/infinite-loading-spinner.png"
      width={150}
      height={150}
      className={spinnerCSS}
      alt="Loading...."
    />
  </div>
);

const spinnerCSS = css`
  animation: spin 2s linear infinite;
  width: inherit;
  height: inherit;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

export default Spinner;
