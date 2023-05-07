import { css } from "@linaria/core";

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
      p,
      h2,
      h3 {
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
    }
    .banner {
      background: rgb(2, 0, 36);
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 9, 121, 1) 35%,
        rgba(0, 212, 255, 1) 78%
      );
      margin: -8px -8px 0;
      height: 85px;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }
`;
