import { createGlobalStyle } from "styled-components";

import { Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: inherit;
}
html {
  font-size: 16px;
}
body {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(${({ theme }) =>
      theme.backgroundGradient.color1} 0%, ${({ theme }) =>
  theme.backgroundGradient.color2} 100%)
}
#__next {
    max-width: 960px;
    width: 100%;
    margin: auto 0px;
    padding: 0px 1rem;
  }
`;
