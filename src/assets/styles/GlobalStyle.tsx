import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    
    // "Crimson Pro" is good for displaying number
    font-family: "Crimson Pro","Noto Sans KR","Californian FB","D2Coding", "Arial", sans-serif;
    font-weight: 300; // it can be 100 to 500 from font I received
    
  }
  
  html{
    margin: 0;
  }
  body {
    margin: 0;
    line-height: 1.5;

    font-size: 16px;
    color: rgba(0,0,0,0.7);
    
    word-break: break-all; //줄바꿈 시 문자 단위로 설정(not 단어 단위)
    /* white-space: pre-line; // line break (with tab, use pre-wrap) */
  }
  h1, h2, h3, h4, h5, h6 {
    margin : 0;
  }
  // in next project, give p tag "margin:0;"
  // it looks better to give "margin:0" to all tag "*" than the above
`;

export default GlobalStyle;
