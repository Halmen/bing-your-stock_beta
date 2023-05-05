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

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }
`;
