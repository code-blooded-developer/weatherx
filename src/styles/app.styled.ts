import { createGlobalStyle } from "styled-components";

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
    background: linear-gradient(#F9FFFF 0%, #38C8E6 100%);
    background-size: cover;
    background-repeat: no-repeat;
}
#__next {
    max-width: 960px;
    width: 100%;
    margin: auto 0px;
    padding: 0px 1rem;
  }
`;
