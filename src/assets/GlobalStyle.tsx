import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html{
    margin: 0;
  }
  body {
    margin: 0;
    line-height: 1.5;
    font-family: "Californian FB","D2Coding", "Arial", sans-serif;
    font-size: 16px;
  }
`;

export default GlobalStyle;
