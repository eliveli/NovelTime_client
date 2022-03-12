import baseStyled, { ThemedStyledInterface } from "styled-components";

const color = {
  textGray: "#606060c2",
  lightGray100_1: "rgba(100,100,100,0.1)",
  lightGray100_2: "rgba(100,100,100,0.2)",
  lightGray0_1: "rgba(0,0,0,0.1)",
};

const theme = {
  color,
};

export default theme;
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
