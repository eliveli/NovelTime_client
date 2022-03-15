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
    word-break: break-all; //줄바꿈 시 문자 단위로 설정(not 단어 단위)
    /* white-space: pre-line; // line break (with tab, use pre-wrap) */
  }
`;

export default GlobalStyle;
